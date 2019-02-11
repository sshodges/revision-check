<?php

include_once("../db.php");
session_start();

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if(!empty($_POST['hash'])) {
    $userId = $_POST['hash'];
    $parent = $_POST['parent'];
    $archivedItems = false;

    $stmt = $db->prepare("SELECT * FROM documents WHERE userId=? AND parent=? AND status='active' ORDER BY docName ASC");
    $stmt->bind_param('ss', $userId, $parent); // 's' specifies the variable type => 'string'
    $stmt->execute();
    $result = $stmt->get_result();

    if (isset($_POST['searchText'])){
        $searchText = addslashes($_POST['searchText']);
        $stmt = $db->prepare("SELECT * FROM documents WHERE userId=? AND docName LIKE '%$searchText%' AND status='active' ORDER BY docName ASC");
        $stmt->bind_param('s', $userId); // 's' specifies the variable type => 'string'
        $stmt->execute();
        $result = $stmt->get_result();
    }

    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {

            if ($row['docType'] == 'archive'){
                $text = '<div class="row item sortable">
                        <div class="col checkbox">
                        </div>
                        <div class="item-row" id="%s" row-type="%s">
                            <img class="img-responsive icon" src="/revisioncheck2/assets/img/%s.png">
                            %s</div>
                         </div>';
            }else {
                $text = '<div class="row item sortable">
                        <div class="col checkbox">
                            <input type="checkbox" class="form-check-input" style="display: none;">
                        </div>
                        <div class="item-row" id="%s" row-type="%s">
                            <img class="img-responsive icon" src="/revisioncheck2/assets/img/%s.png">
                            %s</div>
                         </div>';
            }
            $text = sprintf($text, $row['id'], $row['docType'], $row['docType'], $row['docName']);

            echo $text;
        }
    }

}
?>