<?php

	include_once('my_pass.php');

	// Set here your credentials
	// $dbhost = "";
	// $dbuser = "";
	// $dbpass = "";


	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	$db = mysql_select_db('formapp2014');
	mysql_set_charset('utf8');

	$usertable = "formapp";
?>