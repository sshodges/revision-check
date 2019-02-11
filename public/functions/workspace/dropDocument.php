<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['drag'])) {
    $drag = $_POST['drag'];
    $drop = $_POST['drop'];
    $userId = $_POST['hash'];

    if ($drop != 0){
        $stmt = $db->prepare("SELECT * FROM documents WHERE userId=? AND id=?");
        $stmt->bind_param('ss', $userId, $drop); // 's' specifies the variable type => 'string'
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                if ($row['docType'] != 'document' ){
                    $stmt = $db->prepare("UPDATE documents SET parent=? WHERE id=? AND userId=?");
                    $stmt->bind_param('sss', $drop, $drag, $userId); // 's' specifies the variable type => 'string'
                    $stmt->execute();
                } else {
                    echo 'cannot move file into document';
                }

            }
        }
    } elseif ($drop == 0){
        $stmt = $db->prepare("UPDATE documents SET parent=? WHERE id=? AND userId=?");
        $stmt->bind_param('sss', $drop, $drag, $userId); // 's' specifies the variable type => 'string'
        $stmt->execute();
    }



}
?>