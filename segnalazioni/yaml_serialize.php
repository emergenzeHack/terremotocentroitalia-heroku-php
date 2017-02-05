<?php
require_once(getenv('HOME') . '/vendor/autoload.php');

header("Content-Type: text/plain");

use Symfony\Component\Yaml\Yaml;

$tel = $_GET['tel'];
$email = $_GET['email'];
$descrizione = $_GET['descrizione'];
$indirizzo = $_GET['indirizzo'];
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$link = $_GET['link'];
$immagine = $_GET['immagine'];
$date = $_GET['date'];

$arr = array(
  'tel' => $tel,
  'email' => $email,
  'descrizione' => $descrizione,
  'indirizzo' => $indirizzo,
  'lat' => $lat,
  'lon' => $lon,
  'link' => $link,
  'immagine' => $immagine,
  'data' => $date
);
$yaml = Yaml::dump($arr);
$data = array(
  "title" => substr($descrizione, 0, 30),
  "body" => "<pre><yamldata>$yaml</yamldata></pre>",
  "labels" => [
    "Alloggi",
    "Form"
  ]
);

var_dump($data);