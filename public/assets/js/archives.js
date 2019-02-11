$(document).ready(function() {
    var token;
    if (localStorage.getItem("token") === null) {
      window.location.replace('../login')
    } else {
      token = localStorage.getItem("token");

    }

    $(document).on({

      ajaxStart: function() {
        $("#content-bar").addClass("loading");
        $('.modalLoading').show();
      },
      ajaxStop: function() {
        $("#content-bar").removeClass("loading");
        $('.modalLoading').hide();

      }
    });

    //VARIABLES

        //Variables to hold when right clicking on row
        var clickedId;
        var clickedRow;
        var clickedRowType;
        var revCode;
        var parent = 0;
        var currentName = 'Home'
        var prevName = "Home";
        var prevParent;


        //type of folder user is in
        var docType = 'folder';

    //TOP MENU

        //Make list items draggable and droppable, even if from AJAX request
        makeDroppable = function () {
          $(".item-row").droppable({
              over: function(event, ui) {
                  $(this).addClass("highlighter_focus_in");
              },
              out: function(event, ui) {
                  $(this).removeClass("highlighter_focus_in");
              },
              drop: function( event, ui ) {
                  var drag = $(ui.draggable).attr("id");
                  var dragType = $(ui.draggable).attr("row-type");

                  var drop = $(this).attr("id");
                  var dropType = $(this).attr("row-type");
                  var body = {}
                  body.parent = drop;
                  body = JSON.stringify(body);
                  $.ajax({
                      url: urlStart + "/v1/"+dragType+"s/" + drag,
                      method: "PUT",
                      data: body,
                      dataType: 'json',
                      headers: { "Auth": token },
                      contentType: "application/json",
                       success: function(result,status,jqXHR ){
                          console.log(result);
                          getDocuments();
                       },
                       error(jqXHR, textStatus, errorThrown){
                         console.log(errorThrown);
                       }
                  });

                  console.log(drop);
                  console.log(dropType);
                  console.log(drag);
                  console.log(dragType);


              }
          }).draggable({
              revert: true,
              zIndex: 2500,
              distance: 10,
              revertDuration: 200,
              delay: 200,
              live:true
          });
        };



        //When clicking on logo take back to beginning
        $('#brand').click(function () {
           parent = 0;
           getDocuments();
        });

        //Focus on Open Modals
        $('#folderModal').on('shown.bs.modal', function () {
            $('#folderName').val('').focus();
        });

        $('#documentModal').on('shown.bs.modal', function () {
            $('#documentName').val('').focus();
        });

        $('#revisionModal').on('shown.bs.modal', function () {
            $('#revisionName').val('').focus();
        });

        $('#renameModal').on('shown.bs.modal', function () {
            $('#renameName').focus();
        });



        //Execute function when Enter key hit
        $('.modal-text').keypress(function (e) {
            var modal = ($(this).attr('id'));
            var key = e.which;
            if(key == 13)  // the enter key code
            {
                $('#' + modal + 'Button').click();
                return false;
            }
        });

        $('#searchText').focus(function()
          {
              /*to make this flexible, I'm storing the current width in an attribute*/
              $(this).attr('data-default', $(this).width());
              $(this).attr("placeholder", "Enter Document Number");
              $(this).animate({ width: 250 }, 'slow');
          }).blur(function()
          {
              /* lookup the original width */
              var w = $(this).attr('data-default');
              $(this).attr("placeholder", "Search");

              $(this).animate({ width: 100 }, 'slow');
          }
        );

        $('#searchText').keypress(function (e) {
          var key = e.which;
          if(key == 13)  // the enter key code
          {
            var searchText = $('#searchText').val();
            if (parent === 0 || parent === "0"){
              $('.sad').text('Home')
              $('.previous-breadcrumb').attr('id', 0)
            }

            $('#currentBread').text(searchText);

            $('#searchText').val('');
            if (searchText !== ''){
              searchDocuments(searchText);
            }
          }
        });

    //EDIT DOCUMENT

        // Disable all checkboxes
        disableCheckboxes = function (){
            $('.checkbox .form-check-input').prop('checked', false);
        }

        // Show Checkbox on hover
        $('body').on("mouseover",'.item', function(){
            $("input:checkbox:not(:checked)").hide();
            $($(this).find(':input')).show();
        });

        $('body').on("click",'.checkbox .form-check-input', function(){
            if ($(this).is(":checked")){
                if ($(this).hasClass('archiveChecks')){
                    $('#activateDocument').show();
                } else {

                    disableCheckboxes();
                    $(this).prop('checked', true);
                    $("input:checkbox:not(:checked)").hide();
                    $('#editDocument').fadeIn();

                    clickedId = $(this).parent().next().attr('id');
                    clickedRow = $(this).parent().next().text();
                    clickedRow = $.trim(clickedRow);
                    clickedRowType = $(this).parent().next().attr('row-type');
                }

            } else {
                if ($(this).hasClass('archiveChecks')){
                    $('#activateDocument').hide();
                } else {
                    $('#editDocument').hide();
                    disableCheckboxes();
                }
            }
        });

        $('body').on("click",'.item-row', function(){
            prevName = currentName;
            prevParent = parent;
            currentName = $(this).text().trim();
            parent = $(this).attr('id');
            docType = $(this).attr('row-type')
            if (docType === 'folder'){
              getDocuments();
              getBreadcrumbs();
            } else {
              getRevisions();
              getBreadcrumbs();
            }

        });


        $('#renameButton').click(function () {
            $('#renameTitle').text('Rename '+ clickedRowType);
            $('#renameModal').modal('show');
            $('#renameName').val(clickedRow);
            $('#editDocument').hide();
        });

        $('#deleteButton').click(function () {
            $('#deleteTitle').text('Are you sure you want to delete: ' + clickedRow + '?');
            $('#deleteModal p').hide();
            $('#'+clickedRowType + 'Warning').show();
            $('#deleteModal').modal('show');
            $('#editDocument').hide();
        });

        $('#activateButton').click(function () {
            var ids = $('.archiveChecks:checkbox:checked');
            if (ids.length > 0){
                var async_request=[];
                var responses=[];
                var body = {};
                body.status = true;
                body = JSON.stringify(body);
                for (id=0; id<ids.length;id++){
                    var currentId = $(ids[id]).parent().next().attr('id');

                    async_request.push($.ajax({
                        url:urlStart + "/v1/documents/"+currentId, // your url
                        method:'put',
                        dataType: 'json',
                        data: body,
                        headers: { "Auth": token },
                        contentType: "application/json",
                        success: function(data){
                            console.log('success of ajax response')
                            responses.push(data);
                        }
                    }));
                }
                $.when.apply(null, async_request).done( function(){
                    // all done
                    console.log('all request completed')
                    console.log(responses);
                    getArchives();
                });

            } else {
                $('#alert').html('<div class="alert alert-danger alert-dismissable">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>' +
                    '<strong>No Document Selected:</strong> Please check the boxes of the documents you want to activate' +
                    '</div>')
            }



        });

        $('#searchButton').click(function () {
            var searchText = $('#searchText').val();
            $('#searchText').val('');
            if (searchText !== ''){
                getDocuments(searchText)
            }
        });

    //FUNCTIONS


        getArchives = function (){
          var rows = '<div class="col-xs-12" id="documentbar">';
          if (parent === "0"){
            $('.sad').html('')
          }

          $.ajax({
             url: urlStart + "/v1/archives",
             method: "GET",
             dataType: 'json',
             headers: { "Auth": token },
             contentType: "application/json",
              success: function(result,status,jqXHR ){
                  result.forEach(function (documents) {
                    rows += '<div class="row item sortable">\
                            <div class="col checkbox">\
                                <input type="checkbox" class="form-check-input archiveChecks" style="display: none;">\
                            </div>\
                            <div class="" id="'+documents.id+'" row-type="archive">\
                                <img class="img-responsive icon" src="../assets/img/archive.png">\
                                '+documents.name+'</div>\
                             </div>';
                  });
                  rows += '</div>';
                  $('#documentrow').html(rows);
                 makeDroppable();

              },
              error(jqXHR, textStatus, errorThrown){
                console.log(errorThrown);
              }
          });

        };

        getArchives();

        searchDocuments = function (searchTerm) {
          $('#revisionHeading').hide();
          $('.document-pill').show();
          $('.revision-pill').hide();
          var rows = '<div class="col-xs-12" id="documentbar">';

          $.ajax({
              url: urlStart + "/v1/folders/search/"+searchTerm,
              method: "GET",
              dataType: 'json',
              headers: { "Auth": token },
              contentType: "application/json",
               success: function(result,status,jqXHR ){
                    result.forEach(function (folder) {
                      rows += '<div class="row item sortable">\
                              <div class="col checkbox">\
                                  <input type="checkbox" class="form-check-input" style="display: none;">\
                              </div>\
                              <div class="item-row" id="'+folder.id+'" row-type="folder">\
                                  <img class="img-responsive icon" src="/revisioncheck2/assets/img/folder.png">'+folder.name+'</div>\
                               </div>';
                    });

               },
               error(jqXHR, textStatus, errorThrown){
                 console.log(errorThrown);
               },
               complete: function (){
                 $.ajax({
                     url: urlStart + "/v1/documents/search/"+searchTerm,
                     method: "GET",
                     dataType: 'json',
                     headers: { "Auth": token },
                     contentType: "application/json",
                      success: function(result,status,jqXHR ){
                          result.forEach(function (documents) {
                            rows += '<div class="row item sortable">\
                                    <div class="col checkbox">\
                                        <input type="checkbox" class="form-check-input" style="display: none;">\
                                    </div>\
                                    <div class="item-row" id="'+documents.id+'" row-type="document">\
                                        <img class="img-responsive icon" src="/revisioncheck2/assets/img/document.png">\
                                        '+documents.name+'</div>\
                                     </div>';
                          });
                          rows += '</div>';
                          $('#documentrow').html(rows);
                         makeDroppable();

                      },
                      error(jqXHR, textStatus, errorThrown){
                        console.log(errorThrown);
                      }
                 });
               }
          });
        }

        renameDocuments = function (){
            var body = {};
            body.name = $('#renameName').val();
            body = JSON.stringify(body);

            if (clickedRowType == 'folder'){
              $.ajax({
                  url: urlStart + "/v1/folders/" + clickedId,
                  method: "PUT",
                  data: body,
                  dataType: 'json',
                  headers: { "Auth": token },
                  contentType: "application/json",
                   success: function(result,status,jqXHR ){
                      console.log(result);
                      getDocuments();
                   },
                   error(jqXHR, textStatus, errorThrown){
                     console.log(errorThrown);
                   }
              });
            } else {
              $.ajax({
                  url: urlStart + "/v1/documents/" + clickedId,
                  method: "PUT",
                  data: body,
                  dataType: 'json',
                  headers: { "Auth": token },
                  contentType: "application/json",
                   success: function(result,status,jqXHR ){
                      console.log(result);
                      getDocuments();
                   },
                   error(jqXHR, textStatus, errorThrown){
                     console.log(errorThrown);
                   }
              });
            }

        };

        deleteDocuments = function (){
          var parentId = []
          if (clickedRowType == "folder"){
            $.ajax({
                url: urlStart + "/v1/folders/children/"+clickedId,
                method: "POST",
                dataType: 'json',
                headers: { "Auth": token },
                contentType: "application/json",
                 success: function(result,status,jqXHR ){
                   console.log("success result: ", result);
                 },
                 error(jqXHR, textStatus, errorThrown){
                   console.log(errorThrown);
                 },
                 complete: function (result){
                  var ids = result.responseJSON;
                  var async_request=[];
                  var responses=[];
                  for(id in ids)
                  {
                      console.log("id: ", ids[id]);
                      // you can push  any aysnc method handler
                      async_request.push($.ajax({
                          url:urlStart + "/v1/folders/"+ids[id], // your url
                          method:'delete',
                          dataType: 'json',
                          headers: { "Auth": token },
                          contentType: "application/json",
                          success: function(data){
                              console.log('success of ajax response')
                              responses.push(data);
                          }
                      }));
                      async_request.push($.ajax({
                          url:urlStart + "/v1/documents/parent/"+ids[id], // your url
                          method:'put',
                          dataType: 'json',
                          headers: { "Auth": token },
                          contentType: "application/json",
                          success: function(data){
                              console.log('success of ajax response')
                              responses.push(data);
                          }
                      }));
                  }

                  $.when.apply(null, async_request).done( function(){
                      // all done
                      console.log('all request completed')
                      console.log(responses);
                      getDocuments();
                  });



                 }
              });
          } else {
            var body = {};
            body.status = false;
            body = JSON.stringify(body);
            $.ajax({
                url: urlStart + "/v1/documents/" + clickedId,
                method: "PUT",
                data: body,
                dataType: 'json',
                headers: { "Auth": token },
                contentType: "application/json",
                 success: function(result,status,jqXHR ){
                    console.log(result);
                    getDocuments();
                 },
                 error(jqXHR, textStatus, errorThrown){
                   console.log(errorThrown);
                 }
            });
          }

        };







});
