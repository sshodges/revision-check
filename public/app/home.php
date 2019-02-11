<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Revision Check</title>
    <link rel="stylesheet" href="../assets/css/bootstrap/bootstrap.min.css">
    <script type="text/javascript" src="../assets/js/url.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="../assets/css/bootstrap/bootstrap.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../assets/css/app.css">
    <link rel="stylesheet" href="../assets/css/font-awesome-4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="../assets/js/jquery.qrcode.min.js"></script>
    <link rel="icon" href="../assets/img/icon.png">

</head>
<body style="display:none">
<div id="alert"></div>

<div id="left-bar" class="col-sm-3">
        <a id="brand"><img src="../assets/img/logo.png" class="logo"></a>
        <ul class="" id="left-nav">
            <li><a class="active" href="home">Home</a></li>
            <li><a href="archive">Archive</a></li>
            <li><a href="myaccount">My Account</a></li>
            <li id="logout" class=""><a href="">Logout</a></li>
        </ul>
</div>
<div id="right-bar" class="col-sm-9">
    <div id="search-bar" class="row">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="navbar-form navbar-right">
                <div class="form-group">
                    <input type="text" class="form-control" id="searchText" placeholder="Search">
                    <i class="fa fa-search"></i>
                </div>
            </div>
        </nav>

    </div>
    <div id="content-bar" class="row">
        <div id="add-bar" class="col-md-2 col-xs-12">
            <ul class="addButtons" id="top-bar">
                <li role="presentation" id="newFolder" class="document-pill launch-modal" data-toggle="modal" data-target="#folderModal" holder="#folderModal"><a>New&nbsp;Folder</a></li>
                <li role="presentation" id="newDocument" class="document-pill launch-modal" data-toggle="modal" data-target="#documentModal" holder="#documentModal"><a>New&nbsp;Document</a></li>
                <li role="presentation" id="newRevision" class="revision-pill launch-modal" data-toggle="modal" data-target="#revisionModal" holder="#revisionModal"><a>New&nbsp;Revision</a></li>
            </ul>
            <ul class="addButtons" id="editDocument" style="display: none">
                <li role="presentation" id="renameButton" class="document-pill"><a>Rename</a></li>
                <li role="presentation" id="deleteButton" class="document-pill"><a>Delete</a></li>
            </ul>
        </div>
        <div id="main-bar" class="col-md-10 col-xs-12">
        <div class="modalLoading"></div>
            <!-- Breadcrumbs -->
            <div class="row" id="breadcrumbRow">
                <div class="" id="back">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item previous-breadcrumb" id="previousBread"><a href="" class="sad" id="0"></a></li>
                        <li class="breadcrumb-item active" id="currentBread">Home</li>
                    </ol>
                </div>
            </div>

            <div class="row" id="documentrow">

            </div>
        </div>



    </div>

</div>

    <!-- Modals -->
    <div id="folderModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Folder</h4>
                </div>
                <div class="modal-body">
                    <input id="folderName" placeholder="Folder Name" class="form-control modal-text" autofocus>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal" onclick="addFolder()" id="folderNameButton">Add</button>
                </div>
            </div>

        </div>
    </div>

    <div id="documentModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Document</h4>
                </div>
                <div class="modal-body">
                    <input id="documentName" placeholder="Folder Name" class="form-control modal-text" autofocus>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal" onclick="addDocument()" id="documentNameButton">Add</button>
                </div>
            </div>

        </div>
    </div>

    <div id="renameModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="renameTitle">Rename</h4>
                </div>
                <div class="modal-body">
                    <input id="renameName" placeholder="Folder Name" class="form-control modal-text" autofocus>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal" onclick="renameDocuments()" id="renameNameButton">Rename</button>
                </div>
            </div>

        </div>
    </div>

    <div id="deleteModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="deleteTitle"></h4>
                </div>
                <div class="modal-body">
                    <p id="folderWarning">
                        <br>Deleting this folder will delete all sub-folders and move all documents to the home directory.
                    </p>
                    <p id="documentWarning">Documents cannot be permanently deleted.<br><br>
                        Pressing delete will move this document to the archive folder. You can reactivate a document at any time.
                    </p>
                    <br>
                    <h4 id="delete"></h4>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" data-dismiss="modal" onclick="deleteDocuments()" id="deleteButton">Delete</button>
                </div>
            </div>

        </div>
    </div>

    <div id="revisionModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="revisionTitle">Add Revision</h4>
                </div>
                <div class="modal-body">
                    <input id="revisionName" placeholder="Revision Name" class="form-control modal-text" autofocus>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-dismiss="modal" onclick="addRevision()" id="revisionNameButton">Add</button>
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
<script src="../assets/js/workspace.js"></script>

</body>
</html>
