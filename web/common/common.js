var gWillPageUnload = false;

function httpGet(url, callback) {
    sendRequest(url, "GET", null, callback);
}

function httpPost(url, param, callback){
    sendRequest(url, "POST", param, callback);
}

function sendRequest(url, method, param, callback) {

    window.addEventListener("beforeunload", function(e) {
        gWillPageUnload = true;
    });

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var rData = xhr.responseText;
                console.log(rData);
                try {
                    var json = JSON.parse(rData);
                    callback(true, json);
                    return;
                } catch(e) {
                    console.log(e.message);
                }
            } else if (gWillPageUnload) {
                return;
            }
            callback(false, null);
        }
    }
    xhr.send(param);
}