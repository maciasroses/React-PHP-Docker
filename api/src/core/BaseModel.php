<?php

namespace Core;

use Core\Database;

class BaseModel
{
    public $db;
    protected $primaryKey = 'id';

    protected $tableName = '';
    protected $fillable = [];
    protected $hidden = [];

    // Constructor with $db as database connection.
    public function __construct($dbHost = DB_HOST, $dbPort = DB_PORT, $dbName = DB_NAME, $username = DB_USERNAME, $password = DB_PASSWORD)
    {
        $db = new Database($dbHost, $dbPort, $dbName, $username, $password);
        $this->db = $db;
    }

    // Get safe fields
    public function getSafeFields()
    {
        foreach ($this->fillable as $key => $value) {
            if (in_array($value, $this->hidden)) {
                unset($this->fillable[$key]);
            }
        }

        return $this->fillable;
    }

    // Get all
    public function get()
    {
        $fields = $this->getSafeFields();
        array_unshift($fields, $this->primaryKey);

        return $this->db
            ->table($this->tableName)
            ->select($fields)
            ->execute();
    }

    // Get by id
    public function getById($id)
    {
        $fields = $this->getSafeFields();
        array_unshift($fields, $this->primaryKey);

        $result = $this->db
            ->table($this->tableName)
            ->select($fields)
            ->where(['id'])
            ->execute(['id' => $id]);

        if (!$result) {
            return false;
        }

        return $result[0];
    }

    // Create
    public function create(array $data)
    {
        return $this->db
            ->table($this->tableName)
            ->insert($this->fillable)
            ->execute($data);
    }

    // Update
    public function update(array $data, string $id)
    {
        return $this->db
            ->table($this->tableName)
            ->update(array_keys($data))
            ->where(['id'])
            ->execute($data + ['id' => $id]);
    }

    public function delete($id)
    {
        return $this->db
            ->table($this->tableName)
            ->delete()
            ->where([$this->primaryKey])
            ->execute([$this->primaryKey => $id]);
    }
}
