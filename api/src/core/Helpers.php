<?php

// Response JSON
function responseJson($status = 200, $data = [], $messages = [])
{
  http_response_code($status);
  return json_encode([
    'status' => $status,
    'messages' => $messages,
    'data' => $data,
  ]);
}

// Array key prefix
function arrayKeyPrefix($keyprefix, array $array)
{
  foreach ($array as $k => $v) {
    $array[$keyprefix . $k] = $v;
    unset($array[$k]);
  }

  return $array;
}

/**
 * Function that does api call and returns array of json decoded
 * @param string $method
 * @param string $url
 * @param array $headers
 * @param array $body
 * @return array json decoded
 */
function apiCall($method, $url, $headers, $body)
{
  try {
    $curl = curl_init();

    curl_setopt_array($curl, [
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,

      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => $method,
      CURLOPT_POSTFIELDS => json_encode($body),
      CURLOPT_HTTPHEADER => $headers,
    ]);

    $response = curl_exec($curl);
    curl_close($curl);

    $json = json_decode($response, true, 5);
  } catch (Exception $e) {
    return false;
  }

  return $json;
}

/**
 * Converts a string datetime to a human readable string like "Lunes 25 de marzo de 2023"
 * @param string $date like "2023-12-27 10:02:20"
 */
function convertDateToHumanReadableDate($date)
{
  $date_obj = new DateTime($date);

  $week_days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  $months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  $week_day_number = $date_obj->format('w');
  $month_number = $date_obj->format('n') - 1;
  $day_of_the_month_number = $date_obj->format('d');
  $year = $date_obj->format('Y');

  //hour with minutes and format
  $hour = $date_obj->format('g');
  $minutes = $date_obj->format('i');
  $ampm = $date_obj->format('a');

  $readableDate = $week_days[$week_day_number] . ' ' . $day_of_the_month_number . ' de ' . $months[$month_number] . ' del ' . $year
    . " a las " . $hour . ":" . $minutes . " " . $ampm . " horas";

  return $readableDate;
}

/**
 * Function that uploads an image, and transforms it into webp
 * @param file $file the file associate array derived by $_FILES
 * @param string $name the final name of the file
 * @param string $destinationFolder The final folder for upload the image
 * 
 * @return array with status(Boolean) and message
 */
function uploadImage($file, $name, $destinationFolder)
{
  $target_dir = $destinationFolder;
  $target_file = $target_dir . basename($file['name']);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  if ($file['error'] > 0) {
    return [
      "status" => false,
      "error_code" => 0,
      "error" => "Ocurrió un error inesperado al subir el archivo"
    ];
  }

  // Check if file is a image
  $check = getimagesize($file['tmp_name']);
  if ($check === false) {
    return [
      "status" => false,
      "error_code" => 1,
      "error" => "El archivo no es una imagen."
    ];
  }

  // Check size of file
  if ($file['size'] > 5000000) {
    return [
      "status" => false,
      "error_code" => 2,
      "error" => "El archivo es demasiado grande."
    ];
  }

  // Allow just images of the next formats: PNG, JPG, JPEG, GIF
  if (
    $imageFileType != "png" && $imageFileType != "jpg" && $imageFileType != "jpeg"
    && $imageFileType != "gif"
  ) {
    return [
      "status" => false,
      "error_code" => 3,
      "error" => "Solo se permiten archivos PNG, JPG, JPEG, GIF."
    ];
  }

  // If everything is ok the file will be converted to webp and uploaded
  if ($uploadOk == 1) {
    $image = imagecreatefromstring(file_get_contents($file['tmp_name']));
    $final_dir = $target_dir . basename($name, '.' . $imageFileType) . '.webp';

    if (!is_dir($target_dir)) {
      throw new Exception('El directorio no existe.');
    }

    imagewebp($image, $final_dir, 80);
    imagedestroy($image);

    return [
      "status" => true,
      "message" => "La imagen se subió correctamente y se convirtió a WebP",
      "file_name" => basename($final_dir)
    ];
  } else {
    return [
      "status" => false,
      "error" => "Ocurrió un error al subir el archivo."
    ];
  }
}
