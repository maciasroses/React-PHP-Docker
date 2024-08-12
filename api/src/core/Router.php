<?php

namespace Core;

use Core\Request;

class Router
{
  protected $basePath;
  protected $requestUri;
  protected $requestMethod;
  protected $httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
  protected $wildCards = ['int' => '/^[0-9]+$/', 'any' => '/^[0-9A-Za-z]+$/', 'string' => '/^[A-Za-z]+$/', 'uuid' => '/^[0-9A-Za-z-]+$/'];
  protected $request;

  public function __construct($basePath = APP_SUB_DIRECTORY)
  {
    $this->basePath = $basePath;

    $this->request = new Request();
    $this->requestMethod = $this->request->determineHttpMethod($this->httpMethods);
    $this->requestUri = rtrim(strtok($_SERVER['REQUEST_URI'], '?'), '/');
  }


  public function publicRespond($method, $route, $callable)
  {
    $method = strtolower($method);

    if ($route == '/') {
      $route = $this->basePath;
    } else {
      $route = $this->basePath . $route;
    }

    $matches = $this->matchWildCards($route);

    if (is_array($matches) && $method == $this->requestMethod) {
      call_user_func_array($callable, $matches);
      die();
    }
  }

  public function authRespond($method, $route, $callable)
  {
    $method = strtolower($method);

    if ($route == '/') {
      $route = $this->basePath;
    } else {
      $route = $this->basePath . $route;
    }

    $matches = $this->matchWildCards($route);

    if (is_array($matches) && $method == $this->requestMethod) {
      $user = $this->request->user();
      if (!isset($user['error'])) {
        call_user_func_array($callable, $matches);
      } else {
        echo responseJson($user['code'], [], ['message' => $user['error']]);
      }
      die();
    }
  }

  public function adminRespond($method, $route, $callable)
  {
    $method = strtolower($method);

    if ($route == '/') {
      $route = $this->basePath;
    } else {
      $route = $this->basePath . $route;
    }

    $matches = $this->matchWildCards($route);

    if (is_array($matches) && $method == $this->requestMethod) {
      $admin = $this->request->admin();
      if (!isset($admin['error'])) {
        call_user_func_array($callable, $matches);
      } else {
        echo responseJson($admin['code'], [], ['message' => $admin['error']]);
      }
      die();
    }
  }

  // public function respond($method, $route, $callable)
  // {
  //   $method = strtolower($method);

  //   if ($route == '/') {
  //     $route = $this->basePath;
  //   } else {
  //     $route = $this->basePath . $route;
  //   }

  //   $matches = $this->matchWildCards($route);

  //   if (is_array($matches) && $method == $this->requestMethod) {
  //     $user = $this->request->user();
  //     if (!isset($user['error'])) {
  //       call_user_func_array($callable, $matches);
  //     } else {
  //       echo responseJson($user['code'], [], ['message' => $user['error']]);
  //     }
  //     die();
  //   }
  // }

  // public function adminRespond($method, $route, $callable)
  // {
  //   $method = strtolower($method);

  //   if ($route == '/') {
  //     $route = $this->basePath;
  //   } else {
  //     $route = $this->basePath . $route;
  //   }

  //   $matches = $this->matchWildCards($route);

  //   if (is_array($matches) && $method == $this->requestMethod) {
  //     $admin = $this->request->admin();
  //     if (!isset($admin['error'])) {
  //       call_user_func_array($callable, $matches);
  //     } else {
  //       echo responseJson($admin['code'], [], ['message' => $admin['error']]);
  //     }
  //     die();
  //   }
  // }

  private function matchWildCards($route)
  {
    $variables = [];

    $exp_request = explode('/', $this->requestUri);
    $exp_route = explode('/', $route);

    if (count($exp_request) == count($exp_route)) {
      foreach ($exp_route as $key => $value) {
        if ($value == $exp_request[$key]) {
          continue;
        } elseif ($value[0] == '(' && substr($value, -1) == ')') {
          $strip = str_replace(['(', ')'], '', $value);
          $exp = explode(':', $strip);

          if (array_key_exists($exp[0], $this->wildCards)) {
            $pattern = $this->wildCards[$exp[0]];

            if (preg_match($pattern, $exp_request[$key])) {
              if (isset($exp[1])) {
                $variables[$exp[1]] = $exp_request[$key];
              }

              continue;
            }
          }
        }

        return false;
      }

      return $variables;
    }

    return false;
  }
}
