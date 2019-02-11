<?php
include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $parent = $_POST['parent'];
    $id = $_POST['id'];
    $type = $_POST['type'];

    $ids = array($id);
    $count = 0;

    $stmt = $db->prepare("UPDATE documents SET status='inactive', parent=0 WHERE id=? AND userId=? AND docType='document'");
    $stmt->bind_param('ss', $id, $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $stmt = $db->prepare("DELETE FROM documents WHERE id=? AND userId=? AND docType='folder'");
    $stmt->bind_param('ss', $id, $userId); // 's' specifies the variable type => 'string'
    $stmt->execute();

    do {
        $parentCount = 0;

        if (isset($ids[$count])){
            $stmt = $db->prepare("SELECT * FROM documents WHERE userId=? AND parent=?");
            $stmt->bind_param('ss', $userId, $ids[$count]); // 's' specifies the variable type => 'string'
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $rowId = $row['id'];
                    array_push($ids, $rowId);

                    $stmt = $db->prepare("UPDATE documents SET parent=-1, status='inactive' WHERE id=? AND userId=? AND docType='document'");
                    $stmt->bind_param('ss', $rowId, $userId); // 's' specifies the variable type => 'string'
                    $stmt->execute();

                    $stmt = $db->prepare("DELETE FROM documents WHERE id=? AND userId=? AND docType='folder'");
                    $stmt->bind_param('ss', $rowId, $userId); // 's' specifies the variable type => 'string'
                    $stmt->execute();

                    $parentCount += 1;
                    $childrenExisit = true;
                }
            }
        } else {
            break;
        }

        $count += 1;

    }while($childrenExisit);


} else {
    echo 'error';
}

?>