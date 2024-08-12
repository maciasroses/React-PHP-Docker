<?php

namespace Auth;

use Auth\Model as AuthModel;
use Core\BaseController;
use Throwable;

class Controller extends BaseController
{
    private $model;

    public function __construct()
    {
        parent::__construct();
        $this->model = new AuthModel();
    }

    public function login()
    {
        $isAuthenticated = $this->request->user();

        if (!isset($isAuthenticated['error'])) {
            unset($isAuthenticated['password']);
            unset($isAuthenticated['session_id']);
            unset($isAuthenticated['is_authenticated']);

            return $this->response(
                200,
                ['user' => $isAuthenticated],
                ['message' => 'User already authenticated.']
            );
        }

        $body = $this->request->body();
        $email = isset($body['email']) ? $body['email'] : false;
        $password = isset($body['password']) ? $body['password'] : false;

        if (!$email || !$password) {
            return $this->response(400, [], ['message' => 'Email or password is missing.']);
        }

        try {
            $user = $this->model->getByEmail($email);
        } catch (Throwable $e) {
            return $this->response(500, [], ['message' => $e->getMessage()]);
        }

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->response(401, [], ['message' => 'Email or password is incorrect.']);
        }

        $session_id = bin2hex(random_bytes(32));
        try {
            $this->model->updateSessionId($session_id, $user['id']);
        } catch (Throwable $e) {
            return $this->response(500, [], ['message' => $e->getMessage()]);
        }

        setcookie('session_id', $session_id, time() + (86400 * 7), "/", "", false, true); // 86400 = 1 day

        unset($user['password']);
        unset($user['session_id']);

        return $this->response(
            200,
            ['user' => $user],
            ['message' => 'User logged in.']
        );
    }

    public function register()
    {
        $body = $this->request->body();
        $name = isset($body['name']) ? $body['name'] : false;
        $email = isset($body['email']) ? $body['email'] : false;
        $password = isset($body['password']) ? $body['password'] : false;

        if (!$name || !$email || !$password) {
            return $this->response(400, [], ['message' => 'Name, email, or password is missing.']);
        }

        try {
            $validateUser = $this->model->getByEmail($email);
        } catch (Throwable $e) {
            return $this->response(500, [], ['message' => $e->getMessage()]);
        }

        if ($validateUser) {
            return $this->response(400, [], ['message' => 'User already exists with this email.']);
        }

        $password = password_hash($password, PASSWORD_DEFAULT);
        $session_id = bin2hex(random_bytes(32));

        setcookie('session_id', $session_id, time() + (86400 * 7), "/", "", false, true); // 86400 = 1 day

        try {
            $user_id = $this->model->create([
                'name' => $name,
                'email' => $email,
                'role' => 'user',
                'password' => $password,
                'session_id' => $session_id,
            ]);
        } catch (Throwable $e) {
            return $this->response(500, [], ['message' => $e->getMessage()]);
        }

        return $this->response(
            200,
            ['user' => [
                'id' => $user_id,
                'name' => $name,
                'email' => $email,
                'role' => 'user'
            ]],
            ['message' => 'User registered and logged in.']
        );
    }

    public function logout()
    {
        $isAuthenticated = $this->request->user();

        if (!isset($isAuthenticated['error'])) {
            $this->model->updateSessionId('', $isAuthenticated['id']);
            setcookie('session_id', '', time() - 3600, "/", "", false, true);

            return $this->response(200, [], ['message' => 'User logged out.']);
        }

        return $this->response(401, [], ['message' => 'User not authenticated.']);
    }
}
