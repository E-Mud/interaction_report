var ROOT_URL = "https://api.interact.io/v2/";

function logInUser(email, psswd, user){
	return $.ajax({
      type : "POST",
      url : ROOT_URL + "login",
      dataType : "json",
      contentType : "application/json",
      data : JSON.stringify({
          "username" : email,
          "password" : psswd,
          "scope" : "web portal"
        }),
      success : function(data){
          	user.loginSuccess(data);
        },
      error : function(data){
          if(typeof user.loginError != 'undefined'){
          	user.loginError(data);
          }
        }
    });
} 

function logOutUser(authToken, successFun, errorFun){
	return $.ajax({
      type : "POST",
      url : ROOT_URL + "logout",
      dataType : "json",
      contentType : "application/json",
      data : JSON.stringify({
          "authToken" : authToken
        }),
      success : function(data){
          	successFun(data);
        },
      error : function(data){
          if(typeof errorFun != 'undefined'){
          	errorFun(data);
          }
        }
    });
}

function getInteractionsInfo(user){
	return $.ajax({
      type : "GET",
      url : ROOT_URL + "interactions",
      dataType : "json",
      contentType : "application/json",
      headers : {authToken : user.authToken},
      success : function(data){
          	user.successFun(data);
        },
      error : function(data){
          if(typeof user.errorFun != 'undefined'){
          	user.errorFun(data);
          }
        }
    });
}