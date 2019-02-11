<?php

include_once("../db.php");

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $parent = $_POST['parent'];
    $_SESSION['parent'] = $parent;
    $answerObject = array();
    $currentFolder = '';
    $previousFolder = '';
    $previousId = '';


    $result = $db->query("SELECT * FROM documents WHERE userId='$userId' AND id='$parent'");
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $currentFolder = $row['docName'];
            $parent = $row['parent'];
        }
    }

    $result = $db->query("SELECT * FROM documents WHERE userId='$userId' AND id='$parent'");
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $previousId = $parent;
            $previousFolder =$row['docName'];
        }
    }

    $answerObject = array(
        "currentFolder" => $currentFolder,
        "previousFolder"         => $previousFolder,
        "previousId"          => $previousId
    );

    echo json_encode($answerObject);

}
?>