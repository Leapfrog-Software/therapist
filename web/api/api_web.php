<?php

ini_set('display_errors', "On");
date_default_timezone_set("Asia/Tokyo");

require "./therapist.php";
require "./constants.php";

saveAccessLog();

$command = getPostParam("command");
if (strlen($command) == 0) {
    $command = getParam("command");
}

if (strcmp($command, "register") == 0) {
    register();
}
else {
	echo("unknown");
}

function register() {

    if (Therapist::create()) {
        echo(json_encode(["result" => 0]));
    } else {
        echo(json_encode(["result" => 1]));
    }
}

function getParam($key) {

    if (isset($_GET[$key])) {
        return $_GET[$key];
    }
    return "";
}

function getPostParam($key) {

    if (isset($_POST[$key])) {
        return $_POST[$key];
    }
    return "";
}

function saveAccessLog() {

    $logs = [];

    foreach ($_GET as $key=>$val) {
        $logs[] = $key . "=" . $val;
    }
    foreach ($_POST as $key=>$val) {
        if ((strpos($key, "image") !== false) || (strpos($key, "Image") !== false) || (strpos($key, "movie") !== false)) {
            continue;
        }
        $logs[] = $key . "=" . $val;
    }

    $filePath = "./log/" . date("Ymd") . "_web.txt";
    $text = date("H:i:s") . " " . implode("&", $logs) . "\n";
    file_put_contents($filePath, $text, FILE_APPEND);
}

function debugSave($str) {

    $text = date("Y-m-d H:i:s") . " " . $str . "\n";
    file_put_contents("./debug.txt", $text, FILE_APPEND);
}

?>