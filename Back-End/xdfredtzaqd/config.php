<?php
$options = [
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$dsn = "mysql:host=localhost;dbname=siteweb;charset=utf8mb4";
$pdo = new PDO($dsn, 'root', '', $options);

?>