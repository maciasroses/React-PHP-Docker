<?php

namespace Core;

use Auth\Model as AuthModel;

class Request
{
  private $authModel;

  public function __construct()
  {
    $this->authModel = new AuthModel();
  }

  public function user()
  {
    if (isset($_COOKIE['session_id'])) {
      $sessionId = $_COOKIE['session_id'];
      $user = $this->authModel->getBySessionId($sessionId);
      if ($user) {
        $user['is_authenticated'] = true;
        return $user;
      }
      return ['error' => 'User not authenticated.', 'is_authenticated' => false, 'code' => 401];
    }
    return ['error' => 'You must be logged in to access this route.', 'is_authenticated' => false, 'code' => 403];
  }

  public function admin()
  {
    if (isset($_COOKIE['session_id'])) {
      $sessionId = $_COOKIE['session_id'];
      $user = $this->authModel->getBySessionId($sessionId);
      if ($user) {
        if ($user['role'] === 'admin') {
          $user['is_authenticated'] = true;
          return $user;
        }
        return ['error' => 'You must be an admin to access this route.', 'is_authenticated' => false, 'code' => 403];
      }
      return ['error' => 'User not authenticated.', 'is_authenticated' => false, 'code' => 401];
    }
    return ['error' => 'You must be logged in to access this route.', 'is_authenticated' => false, 'code' => 403];
  }

  public function getHeader($header)
  {
    $headers = getallheaders();
    if (isset($headers[$header])) {
      return $headers[$header];
    }
    return false;
  }

  public function parameters()
  {
    return $_GET;
  }

  public function body()
  {
    $data = [];
    $post = json_decode(file_get_contents('php://input'), 1);

    if (count($post)) {
      foreach ($post as $key => $value) {
        $data[$key] = $value;
      }
    }

    return $data;
  }

  public function getMultiPartFormData()
  {
    $data = $_POST;

    return $data;
  }

  public function getFiles()
  {
    $files = $_FILES;

    return $files;
  }

  public function determineHttpMethod($httpMethods)
  {
    $method = strtolower($_SERVER['REQUEST_METHOD']);

    if (in_array($method, $httpMethods)) {
      return $method;
    }

    return 'get';
  }
}
