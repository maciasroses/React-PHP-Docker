<?php

use App\Controllers\Accounting;

$controller = new Accounting();
$router = new Core\Router(APP_SUB_DIRECTORY);

$router->authRespond('GET', '/accounting', function () use ($controller) {
    echo $controller->getAllMyAccounting();
});

$router->authRespond('GET', '/accounting/(uuid:id)', function ($id) use ($controller) {
    echo $controller->getAccountingById($id);
});
