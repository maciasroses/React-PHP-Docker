<?php

use Admin\Controllers\User;

$controller = new User();
$router = new Core\Router(APP_SUB_DIRECTORY . '/admin');

$router->adminRespond('GET', '/user', function () use ($controller) {
    echo $controller->getMe();
});
