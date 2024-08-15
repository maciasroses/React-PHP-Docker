<?php

use App\Controllers\Accounting;

$controller = new Accounting();
$router = new Core\Router(APP_SUB_DIRECTORY);

$router->authRespond('GET', '/accounting', function () use ($controller) {
    echo $controller->getAllMyAccounting();
});

$router->authRespond('GET', '/accounting/bar-chart', function () use ($controller) {
    echo $controller->getAllMyAccountingWithoutPaginationForBarChart();
});

$router->authRespond('GET', '/accounting/(uuid:id)', function ($id) use ($controller) {
    echo $controller->getAccountingById($id);
});

$router->authRespond('POST', '/accounting', function () use ($controller) {
    echo $controller->createAccounting();
});

$router->authRespond('PUT', '/accounting/(uuid:id)', function ($id) use ($controller) {
    echo $controller->updateAccounting($id);
});

$router->authRespond('DELETE', '/accounting/(uuid:id)', function ($id) use ($controller) {
    echo $controller->deleteAccounting($id);
});
