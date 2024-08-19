<?php

namespace Admin\Controllers;

use Throwable;
use Core\BaseController;
use Admin\Models\Accounting as AdminAccountingModel;

class Accounting extends BaseController
{
    private $model;
    public function __construct()
    {
        parent::__construct();
        $this->model = new AdminAccountingModel();
    }

    public function getAllAccounting()
    {
        $queryParams = $this->request->parameters();
        $accounting = $this->model->getAllAccounting($queryParams);

        return $this->response(200, $accounting);
    }
}
