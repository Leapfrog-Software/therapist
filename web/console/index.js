
function onKeyUp() {

    if (event.keyCode == 13) {
        onClickLogin();
    }
}

function initialize() {

}

function onClickLogin() {

    var id = document.getElementById("id").value;
    var password = document.getElementById("password").value;

    if ((id.length == 0) || (password.length == 0)) {
        alert("入力がありません");
        return;
    }

    startLoading();

    var params = new URLSearchParams({
        command: "login",
        id: encodeURI(id),
        password: encodeURI(password)
    }).toString();

    httpPost("../api/api_console.php", params, function(result, json) {
        stopLoading();

        if ((result) && (json.result == 0)) {
            location.href = "./therapist/therapist.html";
        } else {
            alert("ログインに失敗しました");
        }
    });
}
