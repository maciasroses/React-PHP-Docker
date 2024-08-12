<?php

namespace App\Controllers;

use App\Models\User as UserModel;
use Core\BaseController;
use Throwable;

class User extends BaseController
{
    private $model;
    public function __construct()
    {
        parent::__construct();
        $this->model = new UserModel();
    }

    public function getMe()
    {
        $requestUser = $this->request->user();
        $user = $this->model->getMeById($requestUser['id']);

        return $this->response(200, $user);
    }
}
