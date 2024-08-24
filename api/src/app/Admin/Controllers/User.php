<?php

namespace Admin\Controllers;

use Core\BaseController;
use Admin\Models\User as AdminUserModel;
use Throwable;

class User extends BaseController
{
    private $model;
    public function __construct()
    {
        parent::__construct();
        $this->model = new AdminUserModel();
    }

    public function getAllAccountingJustForFilter()
    {
        $users = $this->model->getAllAccountingJustForFilter();

        return $this->response(200, $users);
    }

    public function getAllUsersWithAccountings()
    {
        $queryParams = $this->request->parameters();
        $users = $this->model->getAllUsersWithAccountings($queryParams);

        return $this->response(200, $users);
    }

    public function getMe()
    {
        $requestUser = $this->request->admin();
        $user = $this->model->getUserById($requestUser['id']);

        return $this->response(200, $user);
    }

    public function getUserById($id)
    {
        $user = $this->model->getUserById($id);

        if (!$user) {
            return $this->response(404, [], [
                'error' => 'User not found',
                'description' => 'The user with the id ' . $id . ' was not found',
                'es_error' => 'Usuario no encontrado',
                'es_description' => 'El usuario con el id ' . $id . ' no fue encontrado'
            ]);
        }

        return $this->response(200, $user);
    }
}
