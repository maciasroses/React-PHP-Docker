<?php

namespace Admin\Models;

use Core\BaseModel;
use Exception;

class Accounting extends BaseModel
{
    protected $table = 'accounting';
    protected $primaryKey = 'id';
    protected $fillable = [
        'description',
        'amount',
        'type',
        'currency',
        'date',
        'created_at',
        'updated_at',
        // 'user_id',
    ];
    protected $hidden = "user_id";

    public function getAllAccounting($queryParams)
    {
        $fields = [
            'accounting.id',
            'accounting.description',
            'accounting.amount',
            'accounting.type',
            'accounting.currency',
            'accounting.date',
            'accounting.created_at',
            'accounting.updated_at',
            'user.id as user_id',
            'user.name as user_name',
            'user.email as user_email',
            'user.role as user_role',
        ];

        $query = $this->db
            ->table($this->table)
            ->select($fields)
            ->join('user', 'user.id=accounting.user_id');

        $params = [];

        if (isset($queryParams['q']) && $queryParams['q'] !== '') {
            $query->appendCustomSql("AND (accounting.description LIKE :q)");
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

        if (isset($queryParams['user_id']) && $queryParams['user_id'] !== '') {
            $query->appendCustomSql("AND user_id = :user_id");
            $params['user_id'] = $queryParams['user_id'];
        }

        if (isset($queryParams['date_from']) && $queryParams['date_from'] !== '') {
            $query->appendCustomSql("AND date >= :date_from");
            $params['date_from'] = $queryParams['date_from'];
        }

        if (isset($queryParams['date_to']) && $queryParams['date_to'] !== '') {
            $query->appendCustomSql("AND date <= :date_to");
            $params['date_to'] = $queryParams['date_to'];
        }

        if (isset($queryParams['amount_from']) && $queryParams['amount_from'] !== '') {
            $query->appendCustomSql("AND amount >= :amount_from");
            $params['amount_from'] = $queryParams['amount_from'];
        }

        if (isset($queryParams['amount_to']) && $queryParams['amount_to'] !== '') {
            $query->appendCustomSql("AND amount <= :amount_to");
            $params['amount_to'] = $queryParams['amount_to'];
        }

        $query->order('accounting.created_at', 'desc');

        $result = $query->execute($params);

        return $result;
    }

    public function getAccountingById($id)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $accounting = $this->db
            ->table($this->table)
            ->select($fields)
            ->where([$this->primaryKey])
            ->execute([$this->primaryKey => $id]);

        if (!$accounting) return false;
        return $accounting[0];
    }

    // MAYBE NOT NEEDED
    // public function getAccountingByIdNUserId($id, $user_id)
    // {
    //     $fields = $this->fillable;
    //     $fields[] = $this->primaryKey;

    //     $accounting = $this->db
    //         ->table($this->table)
    //         ->select($fields)
    //         ->where([$this->primaryKey, 'user_id'])
    //         ->execute([$this->primaryKey => $id, 'user_id' => $user_id]);

    //     if (!$accounting) return false;
    //     return $accounting[0];
    // }

    public function getAccountingByUserId($user_id)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $accounting = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(['user_id'])
            ->execute(['user_id' => $user_id]);

        if (!$accounting) return false;
        return $accounting;
    }

    public function createAccounting($data)
    {
        $accounting = $this->db
            ->table($this->table)
            ->insert(array_keys($data))
            ->execute($data);

        return $accounting;
    }

    public function updateAccounting($data)
    {
        $accounting = $this->db
            ->table($this->table)
            ->update(array_keys($data))
            ->where([$this->primaryKey])
            ->execute($data);

        return $accounting;
    }
}
