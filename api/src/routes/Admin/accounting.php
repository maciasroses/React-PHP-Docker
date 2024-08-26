<?php

use Admin\Controllers\Accounting;

$controller = new Accounting();
$router = new Core\Router(APP_SUB_DIRECTORY . '/admin');

$router->adminRespond('GET', '/accounting', function () use ($controller) {
    echo $controller->getAllAccounting();
});

$router->adminRespond('POST', '/accounting/massive-create', function () use ($controller) {
    echo $controller->createMassiveAccounting();
});

$router->adminRespond('PUT', '/accounting/massive-update', function () use ($controller) {
    echo $controller->updateMassiveAccounting();
});

$router->adminRespond('DELETE', '/accounting/massive-delete', function () use ($controller) {
    echo $controller->deleteMassiveAccounting();
});
