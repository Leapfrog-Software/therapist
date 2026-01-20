
var gTherapists = [];

function initialize() {

    startLoading();

    fetchTherapist(function() {
        stopLoading();
        reload();
    });
}

function fetchTherapist(callback) {

    var params = new URLSearchParams({
        command: "getTherapist"
    }).toString();

    httpPost("../../api/api_console.php", params, function(result, json) {
        if ((result) && (json.result == 0)) {
            gTherapists = json.therapists;
            callback();
        } else {
            stopLoading();
            alert("ログインに失敗しました");
        }
    });
}

function reload() {

    var html = "";

    for (var therapist of gTherapists) {
        html += "<a href='javascript:onClickTherapist(\"" + therapist.id + "\")'>";
        html += "<table cellspacing='0' cellpadding='0' class='data_table'><tr>";
        html += "<td><div class='data_td_div'>" + therapist.name + "</div></td>";
        html += "<td><div class='data_td_div'>" + ((therapist.phone.length > 0) ? therapist.phone : "&nbsp") + "</div></td>";
        html += "<td><div class='data_td_div'>" + ((therapist.email.length > 0) ? therapist.email : "&nbsp") + "</div></td>";
        html += "<td><div class='data_td_div'>週" + therapist.days + "日 " + therapist.startHour + "時〜" + therapist.endHour + "時</div></td>";
        html += "</tr></table></a>";
    }

    document.getElementById("dataBase").innerHTML = html;

    if (gTherapists.length > 0) {
        document.getElementById("headerTable").style.display = "table";
        document.getElementById("noData").style.display = "none";
    } else {
        document.getElementById("headerTable").style.display = "none";
        document.getElementById("noData").style.display = "block";
    }
}

function onClickTherapist(id) {

    for (var therapist of gTherapists) {
        if (therapist.id === id) {
            document.getElementById("name").innerHTML = therapist.name;
            document.getElementById("address").innerHTML = therapist.address.length > 0 ? therapist.address : "-";
            document.getElementById("phone").innerHTML = therapist.phone.length > 0 ? therapist.phone : "-";
            document.getElementById("email").innerHTML = therapist.email.length > 0 ? therapist.email : "-";
            document.getElementById("area").innerHTML = therapist.area.length > 0 ? therapist.area : "-";
            document.getElementById("qualification").innerHTML = therapist.qualification.length > 0 ? therapist.qualification : "-";
            document.getElementById("experience").innerHTML = therapist.experience == 0 ? "経験あり" : "未経験";
            document.getElementById("training").innerHTML = therapist.training == 0 ? "要" : "不要";
            document.getElementById("job").innerHTML = therapist.job.length > 0 ? therapist.job : "-";

            var days = "週" + therapist.days + "日 ";
            days += therapist.startHour + "時〜" + therapist.endHour + "時";
            document.getElementById("days").innerHTML = days;

            document.getElementById("dispatch").innerHTML = therapist.dispatch == 0 ? "可" : "不可";
            document.getElementById("sales").innerHTML = therapist.sales == 0 ? "あり" : "なし";

            var bank = therapist.bank + "<br>" + therapist.bankBranch + "<br>" + therapist.bankNo;
            if (bank.length == 0) {
                bank = "-";
            }
            document.getElementById("bank").innerHTML = bank;

            document.getElementById("notes").innerHTML = therapist.notes.replace(/\n/g, "<br>");
            showDialog("dialogTherapist");
            return;
        }
    }
}