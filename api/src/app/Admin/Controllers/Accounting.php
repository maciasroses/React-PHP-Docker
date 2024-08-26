<?php

namespace Admin\Controllers;

use Throwable;
use Core\BaseController;
use Admin\Models\Accounting as AdminAccountingModel;
use DateTime;
use Exception;
use PhpOffice\PhpSpreadsheet\IOFactory;
// use Admin\Models\User as AdminUserModel;

class Accounting extends BaseController
{
    private $model;
    // private $userModel;
    public function __construct()
    {
        parent::__construct();
        $this->model = new AdminAccountingModel();
        // $this->userModel = new AdminUserModel();
    }

    public function getAllAccounting()
    {
        $queryParams = $this->request->parameters();
        $accounting = $this->model->getAllAccounting($queryParams);

        return $this->response(200, $accounting);
    }

    public function createMassiveAccounting()
    {
        // EXAMPLE OF A MASSIVE CREATE:
        // [
        //     {
        //         "description": "asdasd",
        //         "amount": 90,
        //         "type": "Income",
        //         "currency": "EUR",
        //         "date": "2024-08-06T00:00:00.000Z",
        //         "user_id": "48393527-5bfd-11ef-bb56-0242ac120002"
        //     },
        //     {
        //         "description": "sdasd",
        //         "amount": 7,
        //         "type": "Transfer",
        //         "currency": "EUR",
        //         "date": "2024-08-15T00:00:00.000Z",
        //         "user_id": "48394189-5bfd-11ef-bb56-0242ac120002"
        //     }
        // ]

        $files = $this->request->getFiles();
        $responses = [];

        if (isset($files['accountings']) && $files['accountings']['error'] === UPLOAD_ERR_OK) {
            $filePath = $files['accountings']['tmp_name'];
            try {
                // Cargar y procesar el archivo Excel
                $spreadsheet = IOFactory::load($filePath);
                $worksheet = $spreadsheet->getActiveSheet();
                $data = $worksheet->toArray();

                foreach ($data as $index => $row) {
                    // Saltar la primera fila, que es el encabezado
                    if ($index === 0) {
                        continue;
                    }

                    // Extraer los datos de la fila
                    $description = isset($row[0]) ? $row[0] : false;
                    $amount = isset($row[1]) ? $row[1] : false;
                    $type = isset($row[2]) ? $row[2] : false;
                    $currency = isset($row[3]) ? $row[3] : false;
                    $date = isset($row[4]) ? $row[4] : false;
                    $user_id = isset($row[5]) ? $row[5] : false;

                    // Validar los campos
                    if (!$description || !$amount || !$type || !$currency || !$date || !$user_id) {
                        $responses[] = "Missing required fields at row " . $index;
                        continue;
                    }

                    // Convertir la fecha al formato correcto si es necesario
                    try {
                        $dateObject = new DateTime($date);
                        $formattedDate = $dateObject->format('Y-m-d');
                    } catch (Exception $e) {
                        $responses[] = "Invalid date format at row " . $index;
                        continue;
                    }

                    // Crear un nuevo registro en la base de datos
                    $accountingData = [
                        'description' => $description,
                        'amount' => $amount,
                        'type' => $type,
                        'currency' => $currency,
                        'date' => $formattedDate,
                        'user_id' => $user_id,
                    ];

                    try {
                        $this->model->createAccounting($accountingData);
                        $responses[] = "Accounting created at row " . $index;
                    } catch (Throwable $e) {
                        $responses[] = $e->getMessage();
                    }
                }
            } catch (Throwable $e) {
                return $this->response(500, [], ["Error reading the Excel file: " . $e->getMessage()]);
            }
        } elseif ($this->request->body()) {
            $data = $this->request->body();
            foreach ($data as $index => $accounting) {
                $user_id = isset($accounting['user_id']) ? $accounting['user_id'] : false;
                $date = isset($accounting['date']) ? $accounting['date'] : false;
                $description = isset($accounting['description']) ? $accounting['description'] : false;
                $amount = isset($accounting['amount']) ? $accounting['amount'] : false;
                $type = isset($accounting['type']) ? $accounting['type'] : false;
                $currency = isset($accounting['currency']) ? $accounting['currency'] : false;

                if (!$user_id || !$date || !$description || !$amount || !$type || !$currency) {
                    $responses[] = "Missing required fields at the object " . ($index + 1);
                    continue;
                }

                try {

                    // VALIDATIONS NOT NEEDED FOR THIS FUNCTION, BUT IT SHOULD NEED TO BE UNCOMMENTED

                    // $user = $this->userModel->getUserById($user_id);
                    // if (!$user) {
                    //     $responses[] = "User not found at the object " . ($index + 1);
                    //     continue;
                    // }

                    $this->model->createAccounting($accounting);
                    $responses[] = "Accounting created at the object " . ($index + 1);
                } catch (Throwable $e) {
                    $responses[] = $e->getMessage();
                    continue;
                }
            }
        } else {
            return $this->response(400, [], ["No data found"]);
        }

        return $this->response(200, [], $responses);
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

                // VALIDATIONS NOT NEEDED FOR THIS FUNCTION, BUT IT SHOULD NEED TO BE UNCOMMENTED

                // $user = $this->userModel->getUserById($user_id);
                // if (!$user) {
                //     $responses[] = "User not found at the object " . ($index + 1);
                //     continue;
                // }

                // $accountingValidate = $this->model->getAccountingById($accounting_id);
                // $responses[] = $accountingValidate;
                // if (!$accountingValidate) {
                //     $responses[] = "Accounting not found at the object " . ($index + 1);
                //     continue;
                // }

                $this->model->updateAccounting($accounting);
                $responses[] = "Accounting updated at the object " . ($index + 1);
            } catch (Throwable $e) {
                $responses[] = $e->getMessage();
                continue;
            }
        }

        return $this->response(200, [], $responses);
    }

    public function deleteMassiveAccounting()
    {
        // EXAMPLE OF A MASSIVE DELETE:
        // [
        //      "05d8bf1d-6008-11ef-90a5-0242ac120002",
        //      "801b48cf-5fe6-11ef-8f75-0242ac120004"
        // ]

        $data = $this->request->body();
        $responses = [];

        foreach ($data as $index => $accounting) {
            try {
                // VALIDATIONS NOT NEEDED FOR THIS FUNCTION, BUT IT SHOULD NEED TO BE UNCOMMENTED

                // $accountingValidate = $this->model->getAccountingById($accounting);
                // if (!$accountingValidate) {
                //     $responses[] = "Accounting not found at the object " . ($index + 1);
                //     continue;
                // }

                $this->model->deleteAccounting($accounting);
                $responses[] = "Accounting deleted at the object " . ($index + 1);
            } catch (Throwable $e) {
                $responses[] = $e->getMessage();
                continue;
            }
        }

        return $this->response(200, [], $responses);
    }
}
