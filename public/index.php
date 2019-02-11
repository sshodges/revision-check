<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Revision Check</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="">
    <meta name="description" content="A document management system that allows users to easily see if the document they are using is the most up-to-date version. This is used via unique revision code generation and easily scanned QR codes">
    <script type="text/javascript" src="assets/js/url.js"></script>
    <!-- animate css -->
    <link rel="stylesheet" href="assets/css/animate.min.css">
    <!-- bootstrap css -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- font-awesome -->
    <link rel="stylesheet" href="assets/css/font-awesome-4.7.0/css/font-awesome.min.css">
    <!-- google font -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,700,800' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">

    <!-- custom css -->
    <link rel="stylesheet" href="assets/css/index.css">
    <script src="assets/js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="assets/js/index.js"></script>
    <link rel="icon" href="assets/img/icon.png">

</head>
<body>

<!-- start navigation -->
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon icon-bar"></span>
                <span class="icon icon-bar"></span>
                <span class="icon icon-bar"></span>
            </button>
            <a href="https://revisioncheck.com" class="navbar-brand"><b id="first_word" style="color: #4cae4c;">Revision</b> <b id="second_word">Check</b></a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right text-uppercase">
                <li><a href="#" id="checkRevCodeLink">Check RevCode</a></li>
                <li><a href="login">Login</a></li>
            </ul>
        </div>
    </div>
</nav>
<!-- end navigation -->
<!-- start home -->
<section id="home">
    <div class="overlay">
        <div class="container">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10 wow fadeIn" data-wow-delay="0.3s">
                    <h1>Revision Management Made Easy</h1>
                    <p id="overlayParagraph">Revision Check allows users to scan printed documents to see if they are looking at the most recent version. Click below to register</p>
                    <a href="register"><button id="registerOverlay">Register</button></a>
<!--                    <div id="revCheckDiv">-->
<!--                        <h3 class="text-upper">Check RevCode:</h3>-->
<!--                        <div class="input-group">-->
<!--                            <input type="text" id="revCode" class="form-control" value="" placeholder="Enter RevCode">-->
<!--                            <div class="input-group-btn">-->
<!--                                <button class="btn btn-default"  id="checkRevCode" type="submit">-->
<!--                                    Check-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="api-message" style="display: none" id="loading-image"></div>-->
<!--                        <div style="display: none" class="api-message" id="latest-rev">-->
<!--                            <img src="assets/img/green-tick.png" class="result-img">-->
<!--                            <h5 class="result-text">This is the latest revision</h5>-->
<!--                        </div>-->
<!--                        <div style="display: none" class="api-message" id="old-rev">-->
<!--                            <img src="assets/img/red-cross.png" class="result-img">-->
<!--                            <h5 class="result-text">There is a new revision for this document</h5>-->
<!--                        </div>-->
<!--                        <div style="display: none" class="api-message" id="no-rev">-->
<!--                            <img src="assets/img/exclamation-mark.png" class="result-img">-->
<!--                            <h5 class="result-text">RevCode could not be found</h5>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <div class="col-md-1"></div>
            </div>
        </div>
    </div>
</section>
<!-- end home -->
<!-- start divider -->
<section id="divider">
    <div class="container">
        <div class="row">
            <div class="col-md-4 wow fadeInUp templatemo-box" data-wow-delay="1s">
                <i class="fa fa-laptop"></i>
                <h3 class="text-uppercase">SIMPLE USER INTERFACE</h3>
                <p></p>
            </div>
            <div class="col-md-4 wow fadeInUp templatemo-box" data-wow-delay="1s">
                <i class="fa fa-bolt"></i>
                <h3 class="text-uppercase">UPDATES INSTANTLY</h3>
                <p></p>
            </div>
            <div class="col-md-4 wow fadeInUp templatemo-box" data-wow-delay="1s">
                <i class="fa fa-qrcode"></i>
                <h3 class="text-uppercase">EASILY SCANNED</h3>
                <p></p>
            </div>
        </div>
    </div>
</section>
<!-- end divider -->

<!-- start feature -->
<section id="feature">
    <div class="container">
        <div class="row">
            <div class="col-md-12 wow fadeInDown" id="whatIsIt">
                <h3 class="text-uppercase center-heading">What is it?</h3>
                <p>
                    Revision check is a free software that allows you to make printed documents scannable from multiple free mobile apps.
                    Once scanned, users can tell if they are looking at the most recent version of the document.
                    <br><br>
                    Simply register an account, add your document name, then your first revision. Each revision will generate a QR code and a RevCode which you can place on your new document.
                    You can then add revisions additional every time you make changes. Once a new revision is created any of the old documents will show a "This is not the latest revision" message when scanned.
                    <br><br>
                    Revision Check is currently being used in a wide variety of applications, including: Engineering drawings, building plans, procedure manuals, restaurant menus, quotations, business promotions and many more

                </p>
            </div>

        </div>
    </div>
</section>
<!-- end feature -->

<!-- start revcheck -->
<div id="revcheck-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">

            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal">&times;</button>

                <div id="revCheckDiv">
                    <h3 class="text-upper">Check RevCode:</h3>
                    <div class="input-group">
                        <input type="text" id="revCode" class="form-control" value="" placeholder="Enter RevCode">
                        <div class="input-group-btn">
                            <button class="btn btn-default"  id="checkRevCode" type="submit">
                                Check
                            </button>
                        </div>
                    </div>
                    <div class="api-message" style="display: none" id="loading-image"></div>
                    <div style="display: none" class="api-message" id="latest-rev">
                        <img src="assets/img/green-tick.png" class="result-img">
                        <h5 class="result-text">This is the latest revision</h5>
                    </div>
                    <div style="display: none" class="api-message" id="old-rev">
                        <img src="assets/img/red-cross.png" class="result-img">
                        <h5 class="result-text">There is a new revision for this document</h5>
                    </div>
                    <div style="display: none" class="api-message" id="no-rev">
                        <img src="assets/img/exclamation-mark.png" class="result-img">
                        <h5 class="result-text">RevCode could not be found</h5>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<div class="modal fade loginmodal-container" id="revcheck-modal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div id="revCheckDiv">
                    <h3 class="text-upper">Check RevCode:</h3>
                    <div class="input-group">
                        <input type="text" id="revCode" class="form-control" value="" placeholder="Enter RevCode">
                        <div class="input-group-btn">
                            <button class="btn btn-default"  id="checkRevCode" type="submit">
                                Check
                            </button>
                        </div>
                    </div>
                    <div class="api-message" style="display: none" id="loading-image"></div>
                    <div style="display: none" class="api-message" id="latest-rev">
                        <img src="assets/img/green-tick.png" class="result-img">
                        <h5 class="result-text">This is the latest revision</h5>
                    </div>
                    <div style="display: none" class="api-message" id="old-rev">
                        <img src="assets/img/red-cross.png" class="result-img">
                        <h5 class="result-text">There is a new revision for this document</h5>
                    </div>
                    <div style="display: none" class="api-message" id="no-rev">
                        <img src="assets/img/exclamation-mark.png" class="result-img">
                        <h5 class="result-text">RevCode could not be found</h5>
                    </div>
                </div>
        </div>
    </div>

</div>
<!-- end revcheck -->

<!-- start footer -->
<footer>
    <div class="container">
        <div class="row">
            <p id="copyright"></p>
        </div>
    </div>
</footer>
<!-- end footer -->

<script src="assets/js/jquery.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/wow.min.js"></script>
<script src="assets/js/jquery.singlePageNav.min.js"></script>
<script src="assets/js/custom.js"></script>
</body>
</html>
