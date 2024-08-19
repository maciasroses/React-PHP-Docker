<?php

use Admin\Controllers\Accounting;

$controller = new Accounting();
$router = new Core\Router(APP_SUB_DIRECTORY . '/admin');

$router->adminRespond('GET', '/accounting', function () use ($controller) {
    echo $controller->getAllAccounting();
});
