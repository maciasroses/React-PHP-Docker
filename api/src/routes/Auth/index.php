<?php

use Auth\Controller;

$controller = new Controller();
$router = new Core\Router(APP_SUB_DIRECTORY . '/auth');

$router->publicRespond('POST', '/login', function () use ($controller) {
    echo $controller->login();
});

$router->publicRespond('POST', '/logout', function () use ($controller) {
    echo $controller->logout();
});

$router->publicRespond('POST', '/register', function () use ($controller) {
    echo $controller->register();
});
