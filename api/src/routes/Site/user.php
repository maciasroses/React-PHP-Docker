<?php

use App\Controllers\User;

$controller = new User();
$router = new Core\Router(APP_SUB_DIRECTORY);

$router->authRespond('GET', '/user', function () use ($controller) {
    echo $controller->getMe();
});
