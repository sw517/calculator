<?php

	$sum = ($_POST["sum"]);
	$ip = $_SERVER['REMOTE_ADDR'];
	$date = date("d-m-Y");
	echo $_SERVER['HTTP_USER_AGENT'];
	$browser = get_browser(null, true);
	$browserName = $browser["browser"];

    $fields = array($sum, $ip, $date, $browserName);

    $fp = fopen('calculations.csv', 'a');

    // foreach ($fields as $val) {
	    fputcsv($fp, $fields);
    // }

	fclose($fp);
?>