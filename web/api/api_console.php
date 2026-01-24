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
} else if (strcmp($command, "pauseTherapist") == 0) {
    pauseTherapist();
} else if (strcmp($command, "deleteTherapist") == 0) {
    deleteTherapist();
} else if (strcmp($command, "updateAuth") == 0) {
    updateAuth();
}
else {
	echo("unknown");
}

function authenticate($command) {

    if ((strcmp($command, "login") == 0) || (strcmp($command, "updateAuth") == 0)) {
        return true;
    }

    $auth = getAuth();

    $token = getCookie("consoleToken");
    return strcmp($token, $auth[2]) == 0;
}

function getAuth() {

    $filePath = "../../data/setting.txt";
    if (file_exists($filePath)) {
        $data = file_get_contents($filePath);
        if ($data !== false) {
            $exploded = explode("<LFGBDY>", $data);
            if (count($exploded) == 3) {
                return $exploded;
            }
        }
    }
    return [
        "admin",
        "admin",
        "cBkn2jpFXVw5rAh2"
    ];
}

function login() {

    $id = urldecode(getPostParam("id"));
    $password = urldecode(getPostParam("password"));

    $auth = getAuth();

    if ((strcmp($id, $auth[0]) == 0) && (strcmp($password, $auth[1]) == 0)) {
        setcookie("consoleToken", $auth[2], time() + 60 * 60 * 24, "/", "", FALSE, TRUE);
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

function pauseTherapist() {

    $therapistId = getPostParam("therapistId");
    $isPaused = getPostParam("isPaused");

    if (Therapist::pause($therapistId, $isPaused)) {
        echo(json_encode(["result" => 0]));
    } else {
        echo(json_encode(["result" => 0]));
    }
}

function deleteTherapist() {
    
    $therapistId = getPostParam("therapistId");

    if (Therapist::delete($therapistId)) {
        echo(json_encode(["result" => 0]));
    } else {
        echo(json_encode(["result" => 0]));
    }
}

function updateAuth() {

    $oldId = urldecode(getPostParam("oldId"));
    $newId = urldecode(getPostParam("newId"));
    $oldPassword = urldecode(getPostParam("oldPassword"));
    $newPassword = urldecode(getPostParam("newPassword"));

    $auth = getAuth();

    if ((strcmp($oldId, $auth[0]) == 0) && (strcmp($oldPassword, $auth[1]) == 0)) {
        $text = $newId . "<LFGBDY>" . $newPassword;
        $filePath = "../../data/setting.txt";
        file_put_contents($filePath, $text);

        echo(json_encode(["result" => 0]));
        return;
    }
    echo(json_encode(["result" => 1]));
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