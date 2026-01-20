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

if (!authenticate($command)) {
    echo(json_encode(["result" => 99]));
    return;
}

if (strcmp($command, "login") == 0) {
    login();
} else if (strcmp($command, "getTherapist") == 0) {
    getTherapist();
}
else {
	echo("unknown");
}

function authenticate($command) {

    if (strcmp($command, "login") == 0) {
        return true;
    }

    $token = getCookie("consoleToken");
    return strcmp($token, Constants::CONSOLE_TOKEN) == 0;
}

function login() {

    $id = urldecode(getPostParam("id"));
    $password = urldecode(getPostParam("password"));

    if ((strcmp($id, Constants::CONSOLE_ID) == 0) && (strcmp($password, Constants::CONSOLE_PASSWORD) == 0)) {
        setcookie("consoleToken", Constants::CONSOLE_TOKEN, time() + 60 * 60 * 24, "/", "", FALSE, TRUE);
        echo(json_encode(["result" => 0]));
    } else {
        echo(json_encode(["result" => 1]));
    }
}

function getTherapist() {

    $therapists = [];

    foreach (Therapist::readAll() as $therapist) {
        $therapists[] = $therapist->toResponse();
    }
    echo(json_encode(["result" => 0, "therapists" => $therapists]));
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

function getCookie($key) {

    if (isset($_COOKIE[$key])) {
        return $_COOKIE[$key];
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

    $filePath = "./log/" . date("Ymd") . "_console.txt";
    $text = date("H:i:s") . " " . implode("&", $logs) . "\n";
    file_put_contents($filePath, $text, FILE_APPEND);
}

function debugSave($str) {

    $text = date("Y-m-d H:i:s") . " " . $str . "\n";
    file_put_contents("./debug.txt", $text, FILE_APPEND);
}

?>