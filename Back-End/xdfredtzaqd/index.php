<?php

require('footer.html');

if(!isset($_SESSION["isAdmin"])){
   ?>
    <div class="login">

    </div>
   <?php
}

require('header.html');
?>