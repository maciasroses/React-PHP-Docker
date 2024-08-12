<?php

getenv('DB_HOST')
    ? ($db_host = getenv('DB_HOST'))
    : ($db_host = 'localhost');
getenv('DB_USER')
    ? ($db_user = getenv('DB_USER'))
    : ($db_user = 'user');
getenv('DB_PASSWORD')
    ? ($db_password = getenv('DB_PASSWORD'))
    : ($db_password = 'pass');
getenv('MYSQL_DATABASE')
    ? ($db_name = getenv('MYSQL_DATABASE'))
    : ($db_name = 'accountingdb');

define('DB_HOST', $db_host);
define('DB_USERNAME', $db_user);
define('DB_PASSWORD', $db_password);
define('DB_NAME', $db_name);
define('DB_PORT', '3306');
