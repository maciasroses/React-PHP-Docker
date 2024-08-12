<?php

$host =
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on'
    ? 'https://' . $_SERVER['HTTP_HOST']
    : 'http://' . $_SERVER['HTTP_HOST'];
define('BASE_HOST', $host);
define('BASE_SERVER', $_SERVER['DOCUMENT_ROOT']);

$executeRoute = $_SERVER['PHP_SELF'];
$subDirectory = explode("/", $executeRoute)[1] !== "api"
    ? "/" . explode("/", $executeRoute)[1]
    : "";

define('APP_SUB_DIRECTORY', $subDirectory . '/api');
