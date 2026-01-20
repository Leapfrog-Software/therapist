function showDialog(dialogId) {

    var dialog = document.getElementById(dialogId);
    dialog.style.visibility = "visible";
    dialog.style.opacity = "1";
    dialog.style.transform = "translateY(0)";
}

function hideDialog(dialogId) {

    var dialog = document.getElementById(dialogId);
    dialog.style.visibility = "hidden";
    dialog.style.opacity = "0";
    dialog.style.transform = "translateY(10px)";
}