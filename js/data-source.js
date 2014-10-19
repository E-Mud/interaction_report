var dataSource = {
	YAxisTitle : "",
	dataSeries : []
}

var DAY_IN_MS = 1000 * 3600 * 24;

var TIME = {
	'tr-7d' : 7 * DAY_IN_MS,
	'tr-30d' : 30 * DAY_IN_MS,
	'tr-90d' : 90 * DAY_IN_MS,
	'tr-12m' : 365 * DAY_IN_MS
}

var AXIS_TITLES = {
	'ri-daily': "Inter. / day",
	'ri-weekly': "Inter. / week",
	'ri-monthly': "Inter. / month"
}

//------------------ Updating functions ------------------------------------------//
function updateDataSource(timeValue, interval, aggregationLevel, typeFilters){
	updateDataSeries(timeValue, interval, aggregationLevel, typeFilters);
	updateAxisTitle(interval);

	return dataSource;
}

function updateAxisTitle(interval){
	dataSource.YAxisTitle = AXIS_TITLES[interval];
}

function updateDataSeries(timeValue, interval, aggregationLevel, typeFilters){
	var result = [];
	var time = (new Date()).getTime() - TIME[timeValue];
	var queryParameters = {startTime : time};

	if(typeFilters.length > 0){
		queryParameters.typeFilters = typeFilters;
	}

	if(aggregationLevel == 'al-ind'){
		var ser = {};
		var users = queryUsersInfo();

		users.forEach(function(us){
			queryParameters.userId = us.id;
			var serData = sliceData(queryInteractions(queryParameters), time, interval);
			var ser = {
				name : us.email,
				data : serData
			};

			result.push(ser);
		});
	}else{
		result.push({
			name : "Group",
			data : sliceData(queryInteractions(queryParameters), time, interval)
		});
	}

	dataSource.dataSeries = result;
}

//------------------ Helper functions -------------------------------------------//
function sliceData(data, time, interval){
	var date = new Date();
	var prevDate = (new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)).getTime();
	var nextDate = getNexDate(prevDate, interval);
	var result = [[(prevDate+nextDate)/2, 0]];

	data.each(function(inter){
		if(inter.time < nextDate){
			prevDate = nextDate;
			nextDate = getNexDate(prevDate, interval);
			result.unshift([(prevDate+nextDate)/2, 0]);
		}

		result[0][1] += 1;
	});

	while(nextDate >= time){
		prevDate = nextDate;
		nextDate = getNexDate(prevDate, interval);
		result.unshift([(prevDate+nextDate)/2, 0]);
	}

	return result;
}

//------------------ Interval functions ------------------------------------------//
function getNexDate(prevTime, interval){
	var date = new Date(prevTime);

	switch(interval){
		case 'ri-daily':
			date.setDate(date.getDate()-1);
			break;
		case 'ri-weekly':
			date.setDate(date.getDate()-7);
			break;
		case 'ri-monthly':
			date.setMonth(date.getMonth()-1);
			break;
	}

	return date.getTime();
}