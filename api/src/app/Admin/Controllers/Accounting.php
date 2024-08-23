<?php

namespace Admin\Controllers;

use Throwable;
use Core\BaseController;
use Admin\Models\Accounting as AdminAccountingModel;
use Admin\Models\User as AdminUserModel;

class Accounting extends BaseController
{
    private $model;
    private $userModel;
    public function __construct()
    {
        parent::__construct();
        $this->model = new AdminAccountingModel();
        $this->userModel = new AdminUserModel();
    }

    public function getAllAccounting()
    {
        $queryParams = $this->request->parameters();
        $accounting = $this->model->getAllAccounting($queryParams);

        return $this->response(200, $accounting);
    }

    public function createAccounting()
    {
        $data = $this->request->body();

        $user_id = isset($data['user_id']) ? $data['user_id'] : false;
        $date = isset($data['date']) ? $data['date'] : false;
        $description = isset($data['description']) ? $data['description'] : false;
        $amount = isset($data['amount']) ? $data['amount'] : false;
        $type = isset($data['type']) ? $data['type'] : false;
        $currency = isset($data['currency']) ? $data['currency'] : false;

        if (!$date || !$description || !$amount || !$type || !$currency || !$user_id) {
            return $this->response(400, [], ['message' => 'Missing required fields']);
        }

        try {
            $user = $this->userModel->getUserById($user_id);
            if (!$user) {
                return $this->response(404, [], ['message' => 'User not found']);
            }
        } catch (Throwable $e) {
            return $this->response(400, [], ['message' => $e->getMessage()]);
        }

        // //DATA FOR TESTING IN JSON FORMAT
        // {
        //     "user_id": "e97604b9-5e7c-11ef-86e9-0242ac120004",
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

    public function updateMassiveAccounting()
    {
        // EXAMPLE OF A MASSIVE UPDATE:
        // [
        //     {
        //         "description": "Test updated and ya o no?",
        //         "amount": "9.12",
        //         "type": "Transfer",
        //         "currency": "USD",
        //         "date": "2021-01-01",
        //         "id": "05d8bf1d-6008-11ef-90a5-0242ac120002",
        //         "user_id": "c4d637ad-5fd4-11ef-8f75-0242ac120004"
        //     },
        //     {
        //         "description": "Nutella updated",
        //         "amount": "8",
        //         "type": "Transfer",
        //         "currency": "GBP",
        //         "date": "2024-08-20",
        //         "id": "801b48cf-5fe6-11ef-8f75-0242ac120004",
        //         "user_id": "e97604b9-5e7c-11ef-86e9-0242ac120004"
        //     }
        // ]

        $data = $this->request->body();
        $responses = [];

        foreach ($data as $index => $accounting) {
            $accounting_id = isset($accounting['id']) ? $accounting['id'] : false;
            $user_id = isset($accounting['user_id']) ? $accounting['user_id'] : false;
            $date = isset($accounting['date']) ? $accounting['date'] : false;
            $description = isset($accounting['description']) ? $accounting['description'] : false;
            $amount = isset($accounting['amount']) ? $accounting['amount'] : false;
            $type = isset($accounting['type']) ? $accounting['type'] : false;
            $currency = isset($accounting['currency']) ? $accounting['currency'] : false;

            if (!$accounting_id || !$user_id || !$date || !$description || !$amount || !$type || !$currency) {
                $responses[] = "Missing required fields at the object " . ($index + 1);
                continue;
            }

            try {
                $user = $this->userModel->getUserById($user_id);
                if (!$user) {
                    $responses[] = "User not found at the object " . ($index + 1);
                    continue;
                }

                $accountingValidate = $this->model->getAccountingById($accounting_id);
                $responses[] = $accountingValidate;
                if (!$accountingValidate) {
                    $responses[] = "Accounting not found at the object " . ($index + 1);
                    continue;
                }

                $this->model->updateAccounting($accounting);
                $responses[] = "Accounting updated at the object " . ($index + 1);
                continue;
            } catch (Throwable $e) {
                $responses[] = $e->getMessage();
                continue;
            }
        }

        return $this->response(200, [], $responses);
    }
}
