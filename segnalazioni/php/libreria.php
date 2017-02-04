<?php
function carica_file($file) {
    $filename = $file["tmp_name"];
    $size = $file["size"];
    if (empty($filename)) {
	return "";
    }
    $check = getimagesize($filename);
    if($check === false) {
	http_response_code(400);
	die("Il file caricato non è un'immagine!");
    }
    if ($size > 3000000) {
        http_response_code(400);
        die("File troppo pesante!");
    }
    $client_id = getenv('IMGUR_CLIENT_ID');
    $handle = fopen($filename, "r");
    $data = fread($handle, filesize($filename));
    $pvars   = array('image' => base64_encode($data));
    $timeout = 30;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
    curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
    $out = curl_exec($curl);
    curl_close ($curl);
    $pms = json_decode($out, true);
    $url = $pms['data']['link'];
    if (!$url) {
        http_response_code(400);
        die("Errore nel caricamento dell'immagine.");
    }
    return $url;
}