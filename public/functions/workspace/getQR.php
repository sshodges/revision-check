<?php

$revCode = $_POST['revCode'];

function forceDownloadQR($url, $width = 150, $height = 150) {
    $url    = urlencode($url);
    $image  = 'http://chart.apis.google.com/chart?chs='.$width.'x'.$height.'&cht=qr&chl='.$url;
    $file = file_get_contents($image);
    header("Content-type: application/octet-stream");
    header("Content-Disposition: attachment; filename=qrcode.png");
    header("Cache-Control: public");
    header("Content-length: " . strlen($file)); // tells file size
    header("Pragma: no-cache");
    echo $file;
    die;
}

?>