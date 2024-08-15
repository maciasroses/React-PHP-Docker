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

    public function getAllMyAccountingWithoutPaginationForBarChart()
    {
        $requestUser = $this->request->user();
        $params = $this->request->parameters();
        $currency = isset($params['currency']) ? strtoupper($params['currency']) : "USD";

        if (!in_array($currency, ["USD", "EUR", "GBP", "MXN"])) {
            // return $this->response(400, [], ['message' => 'Currency not supported']);
            $currency = "USD";
        }

        $accounting = $this->model->getAllMyAccountingWithoutPaginationForBarChart($requestUser['id'], $currency);

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

    public function createAccounting()
    {
        $requestUser = $this->request->user();
        $data = $this->request->body();
        $data['user_id'] = $requestUser['id'];

        $date = isset($data['date']) ? $data['date'] : false;
        $description = isset($data['description']) ? $data['description'] : false;
        $amount = isset($data['amount']) ? $data['amount'] : false;
        $type = isset($data['type']) ? $data['type'] : false;
        $currency = isset($data['currency']) ? $data['currency'] : false;

        if (!$date || !$description || !$amount || !$type || !$currency) {
            return $this->response(400, [], ['message' => 'Missing required fields']);
        }

        // //DATA FOR TESTING IN JSON FORMAT
        // {
        //     "description": "Test",
        //     "amount": 100,
        //     "type": "Income",
        //     "currency": "USD",
        //     "date": "2021-01-01"
        // }

        try {
            $accounting = $this->model->createAccounting($data);
            return $this->response(201, $accounting);
        } catch (Throwable $e) {
            return $this->response(400, [], ['message' => $e->getMessage()]);
        }
    }

    public function updateAccounting($accountingId)
    {
        $requestUser = $this->request->user();
        $data = $this->request->body();

        try {
            $accounting = $this->model->getAccountingById($accountingId, $requestUser['id']);
            if (!$accounting) {
                return $this->response(404, [], ['message' => 'Accounting not found']);
            }
        } catch (Throwable $e) {
            return $this->response(400, [], ['message' => $e->getMessage()]);
        }

        $data['id'] = $accountingId;
        $data['user_id'] = $requestUser['id'];

        try {
            $this->model->updateAccounting($data);
            return $this->response(200, [], ['message' => 'Accounting updated']);
        } catch (Throwable $e) {
            return $this->response(400, [], ['message' => $e->getMessage()]);
        }
    }

    public function deleteAccounting($accountingId)
    {
        $requestUser = $this->request->user();

        try {
            $accounting = $this->model->getAccountingById($accountingId, $requestUser['id']);
            if (!$accounting) {
                return $this->response(404, [], ['message' => 'Accounting not found']);
            }
        } catch (Throwable $e) {
            return $this->response(400, [], ['message' => $e->getMessage()]);
        }

        try {
            $this->model->deleteAccounting($accountingId,  $requestUser['id']);
            return $this->response(200, [], ['message' => 'Accounting deleted']);
            // return $this->response(204);
        } catch (Throwable $e) {
            return $this->response(400, [], ['message' => $e->getMessage()]);
        }
    }
}
