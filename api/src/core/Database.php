<?php

namespace Core;

use ErrorException;
use PDOException;
use PDO;
use Exception;

class Database
{
  private $dbHost;
  private $dbPort;
  private $dbName;
  private $username;
  private $password;
  private $sql = '';
  private $table = null;
  private $statement = null;

  public function __construct($dbHost = DB_HOST, $dbPort = DB_PORT, $dbName = DB_NAME, $username = DB_USERNAME, $password = DB_PASSWORD)
  {
    $this->dbHost = $dbHost;
    $this->dbPort = $dbPort;
    $this->dbName = $dbName;
    $this->username = $username;
    $this->password = $password;
  }

  public function connection()
  {
    try {
      return new PDO(
        'mysql:host=' .
          $this->dbHost .
          ';port=' .
          $this->dbPort .
          ';dbname=' .
          $this->dbName,
        $this->username,
        $this->password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );
    } catch (PDOException $exception) {
      exit('Connection error: ' . $exception->getMessage() . '.');
    }
  }

  public function table(string $table = null)
  {
    $this->table = $table;

    return $this;
  }

  public function insert(array $fields = [])
  {
    $prefixedFields = preg_filter('/^/', ':', $fields);

    $sql =
      'INSERT INTO ' .
      $this->table .
      ' (' .
      implode(', ', $fields) .
      ') VALUES (' .
      implode(', ', $prefixedFields) .
      ')';

    $this->sql = $sql;
    $this->statement = 'insert';

    return $this;
  }

  public function update(array $fields = [])
  {
    $totalFields = count($fields);
    $i = 1;
    $sql = 'UPDATE ' . $this->table . ' SET';

    foreach ($fields as $field) {
      $sql .=
        ' ' . $field . ' = :' . $field . ($i == $totalFields ? null : ',');
      $i++;
    }

    $this->sql = $sql;
    $this->statement = 'update';

    return $this;
  }

  public function join(string $table, string $on)
  {
    $this->sql .= ' INNER JOIN ' . $table . ' ON ' . $on;
    return $this;
  }

  public function leftJoin(string $table, string $on)
  {
    $this->sql .= ' LEFT JOIN ' . $table . ' ON ' . $on;
    return $this;
  }

  public function group(array $columns)
  {
    $this->sql .= ' GROUP BY ' . implode(', ', $columns);
    return $this;
  }

  public function order($by, $direction)
  {
    if (strtolower($direction) !== "asc" && strtolower($direction !== "desc")) {
      throw new ErrorException("Not acceptable order direction.");
    }

    $this->sql .= ' ORDER BY ' . $by . " " . $direction;
    return $this;
  }

  public function delete()
  {
    $sql = 'DELETE FROM ' . $this->table;

    $this->sql = $sql;
    $this->statement = 'delete';

    return $this;
  }

  /**
   * @param array $fields array with the values that we need to include in where clause, if associative values, the key is the field and the value is the name of the value: WHERE key=:value, so on execute function, the name of the value should be this
   * @return sql object with where append
   */
  public function where(array $fields = [])
  {
    $sql = ' WHERE';
    $where = [];
    foreach ($fields as $key => $value) {
      if (is_numeric($key)) {
        $where_value = ' ' . $value . ' = :' . $value;
      } else {
        $where_value = ' ' . $key . ' = :' . $value;
      }

      array_push($where, $where_value);
    }
    $sql .= implode(' AND ', $where);
    $this->sql .= $sql;

    return $this;
  }

  public function select(array $fields = [])
  {
    $sql = 'SELECT ' . implode(', ', $fields) . ' FROM ' . $this->table;

    $this->sql = $sql;

    return $this;
  }

  /**
   * @param string $procedure the name of the procedure to call
   * @param string $params the params to pass to the procedure, example: '3,'name'"
   * 
   * @return boolean
   */
  public function callProcedure(string $procedure, string $params)
  {
    $sql = "CALL $procedure($params)";
    $conn = $this->connection();
    $stmt = $conn->prepare($sql);

    if ($stmt->execute()) {
      return true;
    }
    return false;
  }

  /**
   * Append custom sql to the end of the last function, query SHOULD be parametrized like this: :param
   * @param string $query the sql to append
   * @return $this
   */
  public function appendCustomSql(string $query)
  {

    $this->sql = $this->sql . " " . $query;
    return $this;
  }

  public function execute(array $data = [])
  {
    try {
      $conn = $this->connection();

      $stmt = $conn->prepare($this->sql);

      if ($stmt->execute(arrayKeyPrefix(':', $data))) {
        if ($this->statement == null) {
          return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        if ($this->statement == 'insert') {
          $table = $this->table;

          if ($table === 'user' && isset($data['email'])) {
            $idStmt = $conn->prepare("SELECT id FROM $table WHERE email = :email");
            $idStmt->execute([':email' => $data['email']]);
            return $idStmt->fetchColumn();
          }

          if ($table === 'accounting' && isset($data['user_id'])) {
            $idStmt = $conn->prepare("SELECT id FROM accounting WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 1");
            $idStmt->execute([':user_id' => $data['user_id']]);
            return $idStmt->fetchColumn();
          }

          return $conn->lastInsertId();
        }

        return true;
      }

      return false;
    } catch (Exception $e) {
      throw new Exception(
        $e->getMessage() . '. Sql Query: ' . $this->sql . '.'
      );
    }
  }
}
