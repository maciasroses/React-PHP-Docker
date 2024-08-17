<?php

namespace App\Models;

use Core\BaseModel;

class Accounting extends BaseModel
{
    protected $table = 'accounting';
    protected $primaryKey = 'id';
    protected $fillable = [
        'description',
        'amount',
        'type',
        'currency',
        'date'
    ];
    protected $hidden = [
        'user_id',
        'created_at',
        'updated_at',
    ];

    public function getAllMyAccounting($userId, $queryParams)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $query = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(['user_id']);

        $params = ['user_id' => $userId];

        if (isset($queryParams['q']) && $queryParams['q'] !== '') {
            $query->appendCustomSql("AND (description LIKE :q)");
            $params['q'] = '%' . $queryParams['q'] . '%';
        }

        if (isset($queryParams['currency']) && $queryParams['currency'] !== '') {
            $query->appendCustomSql("AND currency = :currency");
            $params['currency'] = $queryParams['currency'];
        }

        if (isset($queryParams['type']) && $queryParams['type'] !== '') {
            $query->appendCustomSql("AND type = :type");
            $params['type'] = $queryParams['type'];
        }

        $query->order('date', 'desc');

        $page = isset($queryParams['page']) ? (int) $queryParams['page'] : 1;
        // $pageSize = isset($queryParams['pageSize']) ? (int) $queryParams['pageSize'] : 6;
        $pageSize = 6;
        $offset = ($page - 1) * $pageSize;

        $result = $query->execute($params);

        $total_pages = ceil(count($result) / $pageSize);

        $query->appendCustomSql("LIMIT $offset, $pageSize");
        $result = $query->execute($params);

        return [
            'accounting_data' => $result ?: [],
            'total_pages' => $total_pages,
        ];
    }

    private function getExchangeRate($fromCurrency, $toCurrency)
    {
        $exchangeRates = [
            'MXN' => ['USD' => 0.054, 'GBP' => 0.02375, 'EUR' => 0.051],
            'GBP' => ['USD' => 1.29, 'MXN' => 42.0, 'EUR' => 1.18],
            'USD' => ['MXN' => 18.18, 'GBP' => 0.83, 'EUR' => 0.93],
            'EUR' => ['MXN' => 19.61, 'GBP' => 0.85, 'USD' => 1.07],
        ];

        return isset($exchangeRates[$fromCurrency][$toCurrency])
            ? $exchangeRates[$fromCurrency][$toCurrency]
            : 1;
    }

    public function getAllMyAccountingWithoutPaginationForBarChart($userId, $currency)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $data = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(['user_id'])
            ->order('date', 'desc')
            ->execute(['user_id' => $userId]);

        $currencies = [];
        foreach ($data as $item) {
            $currencies[] = $item['currency'];
        }
        $currencies = array_unique($currencies);
        $currencies[] = $currency;

        // Obtener las tasas de cambio
        $exchangeRates = [];
        foreach ($currencies as $localCurrency) {
            if ($localCurrency !== $currency) {
                $exchangeRates[$localCurrency] = $this->getExchangeRate($localCurrency, $currency);
            }
        }

        // Procesar los datos para retornar las cantidades convertidas
        $processedData = [];
        foreach ($data as $item) {
            $conversionRate = ($item['currency'] === $currency) ? 1 : $exchangeRates[$item['currency']];

            // Filtrar campos innecesarios
            $filteredItem = array_diff_key($item, array_flip(['description', 'user_id', 'currency', 'created_at', 'updated_at']));

            // Multiplicar la cantidad por la tasa de conversión
            $filteredItem['amount'] = $item['amount'] * $conversionRate;
            $processedData[] = $filteredItem;
        }

        return $processedData;
    }

    public function getAccountingById($id, $userId)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $result = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(["id", "user_id"])
            ->execute(['id' => $id, 'user_id' => $userId]);

        if (!$result) return false;
        return $result[0];
    }

    public function createAccounting($data)
    {
        $result = $this->db
            ->table($this->table)
            ->insert(array_keys($data))
            ->execute($data);

        return $result;
    }

    public function updateAccounting($data)
    {
        $result = $this->db
            ->table($this->table)
            ->update(array_keys($data))
            ->where(['id', 'user_id'])
            ->execute($data);

        return $result;
    }

    public function deleteAccounting($id, $userId)
    {
        $result = $this->db
            ->table($this->table)
            ->delete()
            ->where(['id', 'user_id'])
            ->execute(['id' => $id, 'user_id' => $userId]);

        return $result;
    }
}
