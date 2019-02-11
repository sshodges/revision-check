<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Workspace - THW</title>
    <link rel="stylesheet" href="../assets/css/bootstrap/bootstrap.min.css">
    <script type="text/javascript" src="../assets/js/url.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="../assets/css/bootstrap/bootstrap.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../assets/css/app.css">
    <link rel="stylesheet" href="../assets/css/myaccount.css">
    <link rel="stylesheet" href="../assets/css/font-awesome-4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="../assets/js/jquery.qrcode.min.js"></script>
</head>
<body>
<div id="alert"></div>

<div id="left-bar" class="col-sm-3">
    <a id="brand"><img src="../assets/img/logo.png" class="logo"></a>
    <ul class="" id="left-nav">
        <li><a href="home">Home</a></li>
        <li><a href="archive">Archive</a></li>
        <li><a class="active" href="myaccount">My Account</a></li>
        <li id="logout" class=""><a href="">Logout</a></li>
    </ul>
</div>
<div id="right-bar" class="col-sm-9">

    <div id="content-bar" class="row">
        <div class="modalLoading"></div>

        <div id="container">
            <div class="row item-account">
                <div class="col-xs-3">
                    <h5>Name</h5>
                </div>
                <div class="col-xs-9 right">
                    <h5><strong id="nameText"></strong><a class="edit" id="name"> Edit</a></h5>
                </div>
            </div>
            <hr>
            <div class="row item-account">
                <div class="col-xs-3">
                    <h5>Company</h5>
                </div>
                <div class="col-xs-9 right">
                    <h5><strong id="companyText"></strong><a class="edit" id="company"> Edit</a></h5>
                </div>
            </div>
            <hr>
            <div id="passwordButtonDiv">
                <div id="passwordButton" class="btn btn-default" onclick="$('#passwordModal').modal('show');">Change Password</div>
            </div>
            <div id="subuserButtonDiv">
                <div id="subuserButton" class="btn btn-default" onclick="$('#subuserModal').modal('show');">Add Team Member</div>
            </div>
            <div id=subuserDetails></div>



            <div class="modal fade" id="subuserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="inputHolder">
                                <input id="email" type="email" placeholder="Email Address" autocomplete="off">
                            </div>
                        </div>
                        <div class="buttonHolder">
                            <button type="button" class="btn btn-primary" id="addSubuser">Add</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="nameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="inputHolder">
                                <input id="nameInput" type="text" placeholder="Name" autocomplete="off">
                            </div>
                        </div>
                        <div class="buttonHolder">
                            <button type="button" class="btn btn-primary" id="changeName">Change</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="companyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="inputHolder">
                                <input id="companyName" type="text" placeholder="Company Name" autocomplete="off">
                            </div>
                        </div>
                        <div class="buttonHolder">
                            <button type="button" class="btn btn-primary" id="changeCompany">Change</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="inputHolder">
                                <input id="oldPassword" type="password" placeholder="Current Password">
                            </div>
                            <div class="inputHolder">
                                <input id="newPassword" type="password" placeholder="New Password"">
                            </div>
                            <div class="inputHolder">
                                <input id="confirmPassword" type="password" placeholder="Confirm New Password"">
                            </div>
                            <div id="change-error"></div>
                        </div>
                        <div class="buttonHolder">
                            <button type="button" class="btn btn-primary" id="changePassword">Change</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

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

<script src="../assets/js/myaccount.js"></script>


</body>
</html>
