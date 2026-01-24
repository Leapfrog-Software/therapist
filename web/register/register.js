
var gExperience = 0;
var gTraining = 0;
var gDispatch = 0;
var gSales = 0;

function onKeyUp() {
	checkInput();
}

function checkInput() {

	var nameLast = document.getElementById("nameLast").value;
	var nameFirst = document.getElementById("nameFirst").value;
	var kanaLast = document.getElementById("kanaLast").value;
	var kanaFirst = document.getElementById("kanaFirst").value;
	var address0 = document.getElementById("address0").value;
	var address1 = document.getElementById("address1").value;
	var address2 = document.getElementById("address2").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var area = document.getElementById("area").value;
	var job = document.getElementById("job").value;

	var values = [
		nameLast,
		nameFirst,
		kanaLast,
		kanaFirst,
		address0,
		address1,
		address2,
		phone,
		email,
		area,
		job
	];
	var isFull = true;
	for (var value of values) {
		if (value.length == 0) {
			isFull = false;
		}
	}

	if (gExperience == 0) {
		var url = document.getElementById("url").value;
		if (url.length == 0) {
			isFull = false;
		}
	}

	if (isFull) {
		document.getElementById("registerButton").style.background = "#52B534";
		return true;
	} else {
		document.getElementById("registerButton").style.background = "#CCC";
		return false;
	}
}

function initialize() {
	preload("topImg", "../img/register/top_s.png", "../img/register/top.png");
}

function preload(elemId, preSrc, src) {

   	document.getElementById(elemId).onload = function() {
    	document.getElementById(elemId).onload = null;
        document.getElementById(elemId).src = src;
    }
    document.getElementById(elemId).src = preSrc;
}

function onClickExperience(index) {

	gExperience = index;
	document.getElementById("experience0").src = (index == 0) ? "../img/common/check_on.png" : "../img/common/check_off.png";
	document.getElementById("experience1").src = (index == 1) ? "../img/common/check_on.png" : "../img/common/check_off.png";

	checkInput();
}

function onClickTraining(index) {

	gTraining = index;
	document.getElementById("training0").src = (index == 0) ? "../img/common/check_on.png" : "../img/common/check_off.png";
	document.getElementById("training1").src = (index == 1) ? "../img/common/check_on.png" : "../img/common/check_off.png";	
}

function onClickDispatch(index) {
	
	gDispatch = index;
	document.getElementById("dispatch0").src = (index == 0) ? "../img/common/check_on.png" : "../img/common/check_off.png";
	document.getElementById("dispatch1").src = (index == 1) ? "../img/common/check_on.png" : "../img/common/check_off.png";
}

function onClickSales(index) {

	gSales = index;
	document.getElementById("sales0").src = (index == 0) ? "../img/common/check_on.png" : "../img/common/check_off.png";
	document.getElementById("sales1").src = (index == 1) ? "../img/common/check_on.png" : "../img/common/check_off.png";	
}

function onClickRegister() {

	if (!checkInput()) {
		return;
	}

	var nameLast = document.getElementById("nameLast").value;
	var nameFirst = document.getElementById("nameFirst").value;
	var kanaLast = document.getElementById("kanaLast").value;
	var kanaFirst = document.getElementById("kanaFirst").value;
	var address0 = document.getElementById("address0").value;
	var address1 = document.getElementById("address1").value;
	var address2 = document.getElementById("address2").value;
	var address3 = document.getElementById("address3").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var emailConfirm = document.getElementById("emailConfirm").value;
	var area = document.getElementById("area").value;
	var qualification = document.getElementById("qualification").value;
	var url = document.getElementById("url").value;
	var job = document.getElementById("job").value;
	var notes = document.getElementById("notes").value;

	if (email !== emailConfirm) {
		alert("メールアドレスに誤りがあります");
		return;
	}
	if (!isValidEmail(email)) {
		alert("メールアドレスに誤りがあります");
		return;
	}

	if (!confirm("送信してよろしいですか？")) {
		return;
	}

	startLoading();

	var params = new URLSearchParams({
        command: "register",
        nameLast: encodeURI(nameLast),
        nameFirst: encodeURI(nameFirst),
        kanaLast: encodeURI(kanaLast),
        kanaFirst: encodeURI(kanaFirst),
        address0: encodeURI(address0),
        address1: encodeURI(address1),
        address2: encodeURI(address2),
        address3: encodeURI(address3),
        phone: encodeURI(phone),
        email: encodeURI(email),
        area: encodeURI(area),
        qualification: encodeURI(qualification),
        experience: gExperience,
        url: encodeURI(url),
        training: gTraining,
        job: encodeURI(job),
        days: document.getElementById("days").selectedIndex + 1,
        startHour: document.getElementById("startHour").selectedIndex,
        endHour: document.getElementById("endHour").selectedIndex,
        dispatch: gDispatch,
        sales: gSales,
        notes: encodeURI(notes)
    }).toString();

    httpPost("../api/api_web.php", params, function(result, json) {
        stopLoading();

        if ((result) && (json.result == 0)) {
        	alert("送信しました");
        	location.href = "../";
        } else {
            alert("通信に失敗しました");
        }
    });
}

function isValidEmail(email) {

	var splited = email.split("@");
	if (splited.length != 2) {
		return false;
	}
	if ((splited[0].length > 0) && (splited[1].length > 0)) {
		return true;
	} else {
		return false;
	}
}