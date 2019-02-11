<?php


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Archives | Revision Check</title>
    <link rel="stylesheet" href="../assets/css/bootstrap/bootstrap.min.css">
    <script type="text/javascript" src="../assets/js/url.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="../assets/css/bootstrap/bootstrap.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../assets/css/app.css">
    <link rel="stylesheet" href="../assets/css/font-awesome-4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="../assets/js/jquery.qrcode.min.js"></script>
</head>
<body>
<div id="alert"></div>

<div id="left-bar" class="col-sm-3">
    <a id="brand"><img src="../assets/img/logo.png" class="logo"></a>
    <ul class="" id="left-nav">
        <li><a href="home">Home</a></li>
        <li><a class="active" href="archive">Archive</a></li>
        <li><a href="myaccount">My Account</a></li>
        <li id="logout" class=""><a href="">Logout</a></li>
    </ul>
</div>
<div id="right-bar" class="col-sm-9">

    <div id="content-bar" class="row">
        <div class="modalLoading"></div>

        <div id="main-bar" class="col-md-10">
            <div class="row" id="breadcrumbRow">
                <div class="">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item previous-breadcrumb" id="previousBread"><a href="" class="sad" id="0"></a></li>
                        <li class="breadcrumb-item active" id="currentBread">Archives</li>
                    </ol>
                </div>
            </div>
            <div class="row" id="documentrow">
            </div>
        </div>

    </div>
    <div id="add-bar" class="col-sm-2">
        <ul class="addButtons" id="activateDocument" style="display: none">
            <li role="presentation" id="activateButton" class="document-pill"><a>Activate</a></li>
        </ul>
    </div>
</div>

<div id="qrModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="qrHeading"></h4>
            </div>
            <div class="modal-body">
                <div id="qrcode"></div>
            </div>
            <a class="btn btn-success" id="qrButton">Download</a>
        </div>

    </div>
</div>




<script src="../assets/js/archives.js"></script>



</body>
</html>
