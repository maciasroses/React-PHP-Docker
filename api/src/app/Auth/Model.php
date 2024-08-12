<?php

namespace Auth;

use Core\BaseModel;

class Model extends BaseModel
{
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'role',
        'password',
        'session_id',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function getById($id)
    {

        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $user = $this->db
            ->table($this->table)
            ->select($fields)
            ->where([$this->primaryKey])
            ->execute([$this->primaryKey => $id]);

        if (!$user) return false;
        return $user;
    }

    public function getBySessionId($sessionId)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $user = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(['session_id'])
            ->execute(['session_id' => $sessionId]);

        if (!$user) return false;
        return $user[0];
    }

    public function updateSessionId($sessionId, $id)
    {
        return $this->db
            ->table($this->table)
            ->update(['session_id'])
            ->where([$this->primaryKey])
            ->execute(['session_id' => $sessionId, $this->primaryKey => $id]);
    }

    public function getByEmail($email)
    {
        $fields = $this->fillable;
        $fields[] = $this->primaryKey;

        $user = $this->db
            ->table($this->table)
            ->select($fields)
            ->where(['email'])
            ->execute(['email' => $email]);

        if (!$user) return false;
        return $user[0];
    }

    public function create($data)
    {
        return $this->db
            ->table($this->table)
            ->insert($this->fillable)
            ->execute($data);
    }
}
