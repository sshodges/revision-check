<?php

$status = '';

if(!empty($_GET['revcode'])) {
    $revcode = $_GET['revcode'];
    $s = curl_init();
    curl_setopt($s,CURLOPT_URL,'https://api.revisioncheck.com/v1/revcodes/' . $revcode);
    curl_setopt($s, CURLOPT_RETURNTRANSFER, TRUE);


    $result = curl_exec($s);
    curl_close($s);
    $json = json_decode($result, TRUE);

    echo isset($json);
    if (isset($json)){
        if ( (int)($json['latest']) == 1){
            $template = 'templates/latest.php';
        } else {
            $template = 'templates/old.php';
        }
        $revision = $json['name'];
        $documentId = $json['documentId'];

        $s = curl_init();
        curl_setopt($s,CURLOPT_URL,'https://api.revisioncheck.com/v1/documents/' . $documentId);
        curl_setopt($s, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($s);
        curl_close($s);
        $json = json_decode($result, TRUE);
        $documentName = $json['name'];

    } else {
        $template = 'templates/notfound.php';
    }



}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Check Rev</title>
    <link rel="stylesheet" href="https://revisioncheck.com/assets/css/bootstrap/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="assets/css/bootstrap/bootstrap.min.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="assets/css/checkrev.css">
    <script type="text/javascript" src="assets/js/jquery.qrcode.min.js"></script>
    <link rel="icon" href="assets/img/icon.png">

</head>
<body>

     <?php include_once($template); ?>


</body>
</html>
