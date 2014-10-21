<?php

	include_once('db.php');

	// Form values
	$name 		= 	$_POST['name'];
	$age 		= 	$_POST['age'];
	$latitude 	= 	$_POST['latitude'];
	$longitude 	= 	$_POST['longitude'];
	$quantity 	=	$_POST['quantity'];
	$activity 	=	$_POST['activity'];
	$behaivor 	=	$_POST['behaivor'];
	$habitat 	= 	$_POST['habitat'];
	$weather 	= 	$_POST['weather'];
	$comments 	=	$_POST['comments'];



	// Insert Data
	$sql = "INSERT INTO formapp "."
	(name,age,latitude,longitude,quantity,activity,behaivor,habitat,weather,comments) "."
	VALUES ( '$name', '$age', '$latitude', '$longitude', '$quantity', '$activity', '$behaivor', '$habitat', '$weather', '$comments' )";


	mysql_select_db('formapp2014');
	$retval = mysql_query( $sql, $conn );
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}
	//echo "Entered data successfully\n";
	mysql_close($conn);



	$from = $name;
	$subject = $_POST['name'];
	$message = "Novo Post enviado";
	// send mail
	//mail("re2005@gmail.com, pauloeducardoso@gmail.com",$subject,$message,"From: $from\n");


?>
