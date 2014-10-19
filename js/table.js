function typeToString(type){
	switch(type){
		case "sms-incoming":
		return "SMS (in)"
		case 'sms-outgoing':
		return "SMS (out)";
		case "call-incoming":
		return "Call (in)"
		case 'call-outgoing':
		return "Call (out)";
		case "email-incoming":
		return "E-Mail  (in)"
		case 'email-outgoing':
		return "E-Mail  (out)";
		case "im-incoming":
		return "IM (in)"
		case 'im-outgoing':
		return "IM (out)";
		default:
		return "unknown";
	}
} 


function buildTable(tableBody, interactionsInfo, usersInfo){
	var usersEmails = {};

	usersInfo.forEach(function(us){
		usersEmails[us.id] = us.email;
	});

	tableBody.empty();

	interactionsInfo.each(function(inter){
		tableBody.append("<tr><td>" + (new Date(inter.time)).toUTCString() + "</td><td>" + usersEmails[inter.userId] + "</td><td>" + typeToString(inter.type) + "</td></tr>");
	})
}