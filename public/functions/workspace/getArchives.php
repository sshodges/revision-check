<?php

include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $result = $db->query("SELECT * FROM documents WHERE userId='$userId' AND status='inactive' ORDER BY docName ASC");
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $text = '<div class="row item sortable">
                        <div class="col checkbox">
                            <input type="checkbox" class="form-check-input archiveChecks" style="display: none;">
                        </div>
                        <div class="" id="%s" row-type="%s">
                            <img class="img-responsive icon" src="assets/img/%s.png">
                            %s</div>
                         </div>';
            $text = sprintf($text, $row['id'], $row['docType'], $row['docType'], $row['docName']);
            echo $text;
        }

    }
}
?>