<?

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowed_origins = ['http://localhost:5173'];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
} else {
    header("Access-Control-Allow-Origin: 'null'");
}
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS, PUT, PATCH");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Origin, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

require_once 'app.php';
