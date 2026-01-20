
var gExperience = 0;
var gTraining = 0;
var gDispatch = 0;
var gSales = 0;

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

	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var area = document.getElementById("area").value;
	var qualification = document.getElementById("qualification").value;
	var job = document.getElementById("job").value;
	var bank = document.getElementById("bank").value;
	var bankBranch = document.getElementById("bankBranch").value;
	var bankNo = document.getElementById("bankNo").value;
	var notes = document.getElementById("notes").value;

	if (name.length == 0) {
		alert("氏名の入力がありません");
		return;
	}
	if (phone.length == 0) {
		alert("電話の入力がありません");
		return;
	}
	if (email.length == 0) {
		alert("メールの入力がありません");
		return;
	}

	if (!confirm("送信してよろしいですか？")) {
		return;
	}

	startLoading();

	var params = new URLSearchParams({
        command: "register",
        name: encodeURI(name),
        address: encodeURI(address),
        phone: encodeURI(phone),
        email: encodeURI(email),
        area: encodeURI(area),
        qualification: encodeURI(qualification),
        experience: gExperience,
        training: gTraining,
        job: encodeURI(job),
        days: document.getElementById("days").selectedIndex + 1,
        startHour: document.getElementById("startHour").selectedIndex,
        endHour: document.getElementById("endHour").selectedIndex,
        dispatch: gDispatch,
        sales: gSales,
        bank: encodeURI(bank),
        bankBranch: encodeURI(bankBranch),
        bankNo: encodeURI(bankNo),
        notes: encodeURI(notes)
    }).toString();

    httpPost("../api/api_web.php", params, function(result, json) {
        stopLoading();

        if ((result) && (json.result == 0)) {
        	alert("応募が完了しました");
        	location.href = "../";
        } else {
            alert("通信に失敗しました");
        }
    });
}