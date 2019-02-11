
<script>
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>

<div class="container">
    <div class="row">
        <div class="col-md-6 col-md-push-3 col-xs-10 col-xs-push-1 centered">
            <img class="img-responsive" id="logo" src="assets/img/logo.png">
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 centered">
            <h2 id="subtext">Free QR Document Manager</h2>
        </div>
    </div> 
    
    <div id="info">
        <h3 id="document" class="centered"><strong><?php echo $documentName; ?></strong></h3>
        <h4 id="revision" class="centered"><strong>Revision:</strong> <?php echo $revision; ?></h4>
        <h4 id="revcode" class="centered">
            <strong>RevCode<a href="#" data-toggle="tooltip" data-placement="top" title="Unique Revision Check Code">*</a>:</strong><?php echo $revcode; ?>
        </h4>
        <h5 id="warning" class="centered"><?php echo $warning; ?></h5>

    </div> 

    <div class="row">
        <div class="col-xs-4 col-xs-push-4 col-sm-4 col-sm-push-4 col-md-2 col-md-push-5 centered">
            <img class="img-responsive" id="img" src="assets/img/green-tick.png">
        </div>
    </div>

    <h4 id="checkText" class="centered">This is the latest revision</h4>
</div>


