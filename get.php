<?php

	header('content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");

	include_once('db.php');


	$result = mysql_query("select * from formapp", $conn);

	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}


	print json_encode($rows, JSON_PRETTY_PRINT);

	//Close the database connection
	mysql_close($conn);


?>
