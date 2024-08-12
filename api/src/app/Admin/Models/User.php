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

        $user = $this->db
            ->table($this->table)
            ->select($fields)
            ->where([$this->primaryKey])
            ->execute([$this->primaryKey => $id]);

        if (!$user) return false;
        return $user[0];
    }
}
