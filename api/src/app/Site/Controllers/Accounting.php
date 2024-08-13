<?php

namespace App\Controllers;

use App\Models\Accounting as AccountingModel;
use Core\BaseController;
use Throwable;

class Accounting extends BaseController
{
    private $model;
    public function __construct()
    {
        parent::__construct();
        $this->model = new AccountingModel();
    }

    public function getAllMyAccounting()
    {
        $requestUser = $this->request->user();
        $params = $this->request->parameters();
        $accounting = $this->model->getAllMyAccounting($requestUser['id'], $params);

        return $this->response(200, $accounting);
    }

    public function getAccountingById($id)
    {
        $requestUser = $this->request->user();
        $accounting = $this->model->getAccountingById($id, $requestUser['id']);

        if (!$accounting) {
            return $this->response(404, [], ['message' => 'Accounting not found']);
        }

        return $this->response(200, $accounting);
    }
}
