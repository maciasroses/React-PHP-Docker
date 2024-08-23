<?php

namespace Admin\Models;

use Core\BaseModel;

class User extends BaseModel
{
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'role',
        'created_at',
        'updated_at'
    ];
    protected $hidden = [
        'password',
        'session_id'
    ];

    public function getAllUsers($queryParams)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $query = $this->db
            ->table($this->table)
            ->select($fields);

        $params = [];

        if (isset($queryParams['q']) && $queryParams['q'] !== '') {
            $query->appendCustomSql("AND (name LIKE :q OR email LIKE :q)");
            $params['q'] = '%' . $queryParams['q'] . '%';
        }

        if (isset($queryParams['role']) && $queryParams['role'] !== '') {
            $query->appendCustomSql("AND role = :role");
            $params['role'] = $queryParams['role'];
        }

        $result = $query->execute($params);

        $accounting = new Accounting();

        foreach ($result as $key => $value) {
            $accountings = $accounting->getAccountingByUserId($value['id']);
            if ($accountings) {
                $result[$key]['accounting'] = $accountings;
            } else {
                $result[$key]['accounting'] = [];
            }
        }

        return $result;
    }

    public function getUserById($id)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $user = $this->db
            ->table($this->table)
            ->select($fields)
            ->where([$this->primaryKey])
            ->execute([$this->primaryKey => $id]);

        if (!$user) return false;
        return $user[0];
    }
}
