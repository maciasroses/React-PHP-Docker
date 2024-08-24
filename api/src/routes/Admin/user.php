<?php

use Admin\Controllers\User;

$controller = new User();
$router = new Core\Router(APP_SUB_DIRECTORY . '/admin');

$router->adminRespond('GET', '/users', function () use ($controller) {
    echo $controller->getAllAccountingJustForFilter();
});

$router->adminRespond('GET', '/users/accountings', function () use ($controller) {
    echo $controller->getAllUsersWithAccountings();
});

$router->adminRespond('GET', '/me', function () use ($controller) {
    echo $controller->getMe();
});
