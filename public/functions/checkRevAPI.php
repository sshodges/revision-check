<?php

include_once("db.php");

if(!empty($_GET['revcode'])) {
    $revcode = $_GET['revcode'];
    $stmt = $db->prepare("SELECT * FROM revisions WHERE revCode=?");
    $stmt->bind_param('s', $revcode); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            echo $row['status'];
        }
    } else {
        echo 'notfound';
    }
}

?>