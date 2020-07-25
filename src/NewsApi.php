<?php

require_once dirname(__FILE__) . '/Config.php';

final class NewsApi
{
    private $baseUrl = 'https://newsapi.org/v2';

    public function __construct()
    {}

    public function headlines($query)
    {
        $paramsArr = ['country' => 'us'];

        if ($query && $query !== '') {
            $paramsArr['q'] = $query;
        }

        $queryParams = http_build_query($paramsArr);

        return $this->request('/top-headlines?' . $queryParams);
    }

    private function request($path)
    {
        $ch = curl_init();
        $apiKey = Config::get('newsApiKey');

        curl_setopt_array($ch, [
            CURLOPT_URL => $this->baseUrl . $path,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTPHEADER => [
                "X-Api-Key: $apiKey",
            ],
        ]);

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }
}
