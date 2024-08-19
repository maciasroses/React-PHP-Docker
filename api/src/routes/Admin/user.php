<?php

use Admin\Controllers\User;

$controller = new User();
$router = new Core\Router(APP_SUB_DIRECTORY . '/admin');

$router->adminRespond('GET', '/users', function () use ($controller) {
    echo $controller->getAllUsers();
});

$router->adminRespond('GET', '/me', function () use ($controller) {
    echo $controller->getMe();
});
