<?php

class curl
{
    public $status;
    public $ch;

    function createIssue($data, $url, $username, $password, $mode = "POST")
    {
        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $mode);
        curl_setopt($this->ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($this->ch, CURLOPT_USERPWD, "$username:$password");
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json', 'X-Accepted-OAuth-Scopes: repo'));
        curl_setopt($this->ch, CURLOPT_HEADER, true);
        curl_setopt($this->ch, CURLOPT_CONNECTTIMEOUT, 1);
        curl_setopt($this->ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36');
        curl_exec($this->ch);
        $this->status = curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
    }

    function isFinished()
    {
        if ($this->status === 201) {
            http_response_code(200);
            curl_close($this->ch);
        } else {
            elements::error();
            curl_close($this->ch);
        }
    }
}

