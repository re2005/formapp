<?php

	$dbhost = "formapp2014.db.10951112.hostedresource.com";
	$dbuser = "formapp2014";
	$dbpass = "Renato020626!";
	$conn = mysql_connect($dbhost, $dbuser, $dbpass);
	if(! $conn )
	{
		die('Could not connect: ' . mysql_error());
	}
	$db = mysql_select_db('formapp2014');
	mysql_set_charset('utf8');

	$usertable = "formapp";
?>