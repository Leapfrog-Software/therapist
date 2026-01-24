
var gTherapists = [];
var gSortState = 0;     // 0: エリア, 1: 経験

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
        if (result) {
            if (json.result == 0) {
                gTherapists = json.therapists;
                callback();
                return;
            } else if (json.result == 99) {
                location.href = "../";
                return;
            }
        }
        stopLoading();
        alert("通信に失敗しました");
    });
}

function reload() {

    var html = "";

    gTherapists.sort(function(d1, d2) {
        // エリア
        if (gSortState == 0) {
            var prefIndex1 = 999;
            var prefIndex2 = 999;

            var prefs = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
            for (var i = 0; i < prefs.length; i++) {
                if (d1.area.indexOf(prefs[i]) >= 0) {
                    prefIndex1 = i;
                }
                if (d2.area.indexOf(prefs[i]) >= 0) {
                    prefIndex2 = i;
                }
            }
            if (prefIndex1 == prefIndex2) {
                return 0;
            } else if (prefIndex1 < prefIndex2) {
                return -1;
            } else {
                return 1;
            }
        }
        // 経験
        else {
            if (d1.experience == d2.experience) {
                return 0;
            } else if (d1.experience == 0) {
                return -1;
            } else {
                return 1;
            }
        }
    });

    for (var therapist of gTherapists) {
        html += "<a href='javascript:onClickTherapist(\"" + therapist.id + "\")'>";
        html += "<table cellspacing='0' cellpadding='0' class='data_table'><tr>";
        html += "<td><div class='data_td_div'>" + therapist.nameLast + therapist.nameFirst + "(" + therapist.kanaLast + therapist.kanaFirst + ")</div></td>";
        html += "<td><div class='data_td_div'>" + therapist.phone + "</div></td>";
        html += "<td><div class='data_td_div'>週" + therapist.days + "日 " + therapist.startHour + "時〜" + therapist.endHour + "時</div></td>";
        html += "<td><div class='data_td_div'>" + therapist.area + "</div></td>";
        html += "<td><div class='data_td_div'>" + ((therapist.experience == 0) ? "経験あり" : "未経験") + "</div></td>";
        html += "<td><div class='data_td_div'><a href='javascript:onClickPause(\"" + therapist.id + "\")'>" + ((therapist.isPaused == 0) ? "有効" : "保留") + "</a></div></td>";
        html += "<td><div class='data_td_div'><a href='javascript:onClickDelete(\"" + therapist.id + "\")'>削除</a></div></td>";
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
            document.getElementById("name").innerHTML = therapist.nameLast + therapist.nameFirst + "(" + therapist.kanaLast + therapist.kanaFirst + ")";
            document.getElementById("address").innerHTML = therapist.address0 + therapist.address1 + therapist.address2 + therapist.address3;
            document.getElementById("phone").innerHTML = therapist.phone.length > 0 ? therapist.phone : "-";
            document.getElementById("email").innerHTML = therapist.email.length > 0 ? therapist.email : "-";
            document.getElementById("area").innerHTML = therapist.area.length > 0 ? therapist.area : "-";
            document.getElementById("qualification").innerHTML = therapist.qualification.length > 0 ? therapist.qualification : "-";
            document.getElementById("experience").innerHTML = (therapist.experience == 0 ? "経験あり" : "未経験") + "<br>" + therapist.url;
            document.getElementById("training").innerHTML = therapist.training == 0 ? "要" : "不要";
            document.getElementById("job").innerHTML = therapist.job.length > 0 ? therapist.job : "-";

            var days = "週" + therapist.days + "日 ";
            days += therapist.startHour + "時〜" + therapist.endHour + "時";
            document.getElementById("days").innerHTML = days;

            document.getElementById("dispatch").innerHTML = therapist.dispatch == 0 ? "可" : "不可";
            document.getElementById("sales").innerHTML = therapist.sales == 0 ? "あり" : "なし";

            document.getElementById("notes").innerHTML = therapist.notes.replace(/\n/g, "<br>");
            showDialog("dialogTherapist");
            return;
        }
    }
}

function onClickSortArea() {

    gSortState = 0;
    reload();
}

function onClickSortExperience() {

    gSortState = 1;
    reload();
}

function onClickPause(id) {

    for (var therapist of gTherapists) {
        if (therapist.id === id) {
            var name = therapist.nameLast + therapist.nameFirst;
            var message;
            var isPaused;
            if (therapist.isPaused == 1) {
                message = name + "さんの保留を解除しますか？";
                isPaused = "0";
            } else {
                message = name + "さんを保留にしますか？";
                isPaused = "1";
            }
            if (!confirm(message)) {
                return;
            }
            pauseTherapist(id, isPaused);
            return;
        }
    }
}

function pauseTherapist(id, isPaused) {

    var params = new URLSearchParams({
        command: "pauseTherapist",
        therapistId: id,
        isPaused: isPaused
    }).toString();

    startLoading();

    httpPost("../../api/api_console.php", params, function(result, json) {
        if (result) {
            if (json.result == 0) {
                location.reload();
                return;
            } else if (json.result == 99) {
                location.href = "../";
                return;
            }
        }
        stopLoading();
        alert("通信に失敗しました");
    });
}

function onClickDelete(id) {

    for (var therapist of gTherapists) {
        if (therapist.id === id) {
            var name = therapist.nameLast + therapist.nameFirst;
            if (!confirm(name + "さんを削除してよろしいですか？")) {
                return;
            }
            deleteTherapist(id);
            return;
        }
    }
}

function deleteTherapist(id) {

    var params = new URLSearchParams({
        command: "deleteTherapist",
        therapistId: id
    }).toString();

    startLoading();

    httpPost("../../api/api_console.php", params, function(result, json) {
        if (result) {
            if (json.result == 0) {
                location.reload();
                return;
            } else if (json.result == 99) {
                location.href = "../";
                return;
            }
        }
        stopLoading();
        alert("通信に失敗しました");
    });
}