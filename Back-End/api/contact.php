<?php

if(empty($_POST["email"])){
echo "email Empty !";
return;
}

if(empty($_POST["name"])){
echo "name Empty !";
return;
}

if(empty($_POST["message"])){
echo "message Empty !";
return;
}

if(!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
echo "email No valide !";
return;
}

//if(strlen($_POST["message"]) < 100){
//echo "message no 100 char<br>";
//return;
//}

$message = htmlspecialchars($_POST["message"], ENT_QUOTES);

echo "votre message à était envoyer !";

require('../xdfredtzaqd/config.php');

$stmt = $pdo->prepare("INSERT INTO contact SET email = :email, name = :name, message = :message");
$stmt->execute([':email' => $_POST["email"], ':name' => $_POST["name"], ':message' => $message]);

return;
?>