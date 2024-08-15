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
        $pageSize = isset($queryParams['pageSize']) ? (int) $queryParams['pageSize'] : 3;
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
}
