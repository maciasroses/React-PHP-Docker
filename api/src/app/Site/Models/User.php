<?php

namespace App\Models;

use Core\BaseModel;

class User extends BaseModel
{
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'role'
    ];
    protected $hidden = [
        'password',
        'session_id',
        'created_at',
        'updated_at',
    ];

    public function getMeById($id)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $result = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(['id'])
            ->execute(['id' => $id]);

        if (!$result) return false;
        return $result[0];
    }
}
