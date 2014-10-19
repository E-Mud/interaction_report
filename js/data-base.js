var db = db || TAFFY();


//------------------------------------- Storing functions --------------------------------------------------//
function storeUsersInfo(info){
	var expirationDate = new Date(info.expires);
	createCookie('sesInfo', JSON.stringify(info), expirationDate);
}

function storeInteractionsInfo(info){
	db.insert(info);
}

//------------------------------------- Deleting functions -------------------------------------------------//
function removeInfo(){
	deleteCookie('sesInfo');
	db().remove();
}


//------------------------------------- Querying functions -------------------------------------------------//
function queryUsersInfo(){
	var infoString = getCookie('sesInfo');
	if(typeof infoString == 'undefined'){
		return [];
	}else{
		return JSON.parse(infoString);
	}
}

function queryInteractions(options){
	var startTime = options.startTime || 0;
	var endTime = options.endTime || (new Date()).getTime();

	var queryParameters = {
		'time' : {'lt' : endTime, 'gte' : startTime}
	};

	if(typeof options.userId != 'undefined'){
		queryParameters.userId = options.userId;
	}

	if(typeof options.typeFilters != 'undefined'){
		queryParameters.type = options.typeFilters;
	}

	return db(queryParameters).order('time desc');
}

//------------------------------ Cookie handling functions -----------------------//
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2){
		return parts.pop().split(";").shift();
	}else{
		return null;
	}
} 

function deleteCookie( name ) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function createCookie(name, value, expirationDate){
	document.cookie = name + '='+value+'; expires='+expirationDate.toUTCString()+';';
}