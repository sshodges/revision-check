<?php

include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $parent = $_POST['parent'];
//    echo $userId;
//    echo $parent;

    $result = $db->query("SELECT * FROM revisions WHERE userId='$userId' AND documentId='$parent' ORDER BY id DESC");
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $text = '       <div class="row sortable" id="%s">
                                 <div class="col-sm-12 item">
                                     <div class="col-md-2">
                                        <img class="img-responsive icon" src="assets/img/%s.png">
                                     </div>
                                     <div class="col-md-4">
                                        <p class="textItem">%s</p>
                                     </div>
                                     <div class="col-md-3">
                                        <p class="textItem">%s</p>
                                     </div>
                                     <div class="col-md-3">
                                        <div class="btn btn-default downloadQR" id="%s">View</div>
                                     </div>
                                 </div>
                             </div>';
            $text = sprintf($text, $row['id'], $row['status'], $row['revision'], $row['revCode'], $row['revCode']);
            echo $text;
        }

    }
}
?>