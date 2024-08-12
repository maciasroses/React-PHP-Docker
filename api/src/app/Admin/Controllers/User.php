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

    public function getMe()
    {
        $requestUser = $this->request->admin();
        $user = $this->model->getMeById($requestUser['id']);

        return $this->response(200, $user);
    }
}
