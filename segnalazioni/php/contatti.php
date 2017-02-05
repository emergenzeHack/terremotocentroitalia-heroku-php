<?php
require_once(getenv('HOME') . '/vendor/autoload.php');
use Symfony\Component\Yaml\Yaml;
if (in_array('curl', get_loaded_extensions())) {
    set_time_limit(120);
    ini_set('max_execution_time', 120);
    mb_internal_encoding("UTF-8");
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = strip_tags(trim($_POST["nome"]));
        $tel = strip_tags(trim($_POST["tel"]));
        $email = strip_tags(filter_var(trim($_POST["email"]),FILTER_SANITIZE_EMAIL));
        $descrizione = strip_tags(trim($_POST["descrizione"]));
        $descrizione = trim(preg_replace('/\s\s+/', ' ', $descrizione));
        $indirizzo = strip_tags(trim($_POST["indirizzo"]));
        $link = strip_tags(trim($_POST["link"]));
        $lat = strip_tags(trim($_POST["lat"]));
        $lon = strip_tags(trim($_POST["lon"]));
        $date = date('d/m/Y');
        if (empty($nome)) {
            http_response_code(400);
            echo "Compila tutti i campi!";
            exit;
        }
        $body = array(
          'nome'        => $nome,
          'tel'         => $tel,
          'email'       => $email,
          'descrizione' => $descrizione,
          'indirizzo'   => $indirizzo,
          'lat'         => $lat,
          'lon'         => $lon,
          'link'        => $link,
          'data'        => $date
        );
        $yaml = Yaml::dump($body);
        $data = array(
            "title" => $nome,
            "body" => "<pre><yamldata>$yaml</yamldata></pre>",
            "labels" => [
                "Contatti",
                "Form"
            ]
        );
        $data_string = json_encode($data);
        $agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36';
        $username = getenv('GITHUB_USERNAME');
        $password = getenv('GITHUB_PASSWORD');
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.github.com/repos/emergenzeHack/terremotocentro_segnalazioni/issues');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept=> application/json', 'Content-Type=> application/json', 'X-Accepted-OAuth-Scopes: repo'));
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, $agent);
        curl_exec($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($status_code === 201) {
            http_response_code(200);
            curl_close($ch);
        } else {
            http_response_code(400);
            curl_close($ch);
            echo "Non riesco ad aprire la segnalazione!";
        }
    } else {
        http_response_code(403);
        echo "Accesso negato!";
    }
} else {
    http_response_code(400);
    echo "CURL non è installato/attivato su questo server!";
}