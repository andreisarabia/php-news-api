<?php

if ($_SERVER["REQUEST_METHOD"] !== 'POST') {
    exit();
}

require_once dirname(__FILE__) . '/../src/NewsApi.php';

$newsApi = new NewsApi();

switch ($_POST['newsType']) {
    case 'headlines':
        $query = $_POST['q'] ?? null;
        echo $newsApi->headlines($query);
        break;
    default:
        exit();
}
