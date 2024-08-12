<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Core\Application(dirname(__DIR__));

require __DIR__ . '/config/index.php';

require __DIR__ . '/routes/api.php';

return $app;
