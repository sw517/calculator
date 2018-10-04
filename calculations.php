<?php

	$file = fopen("calculations.csv","r");
	$dataArray = array();

	if (($handle = $file) !== FALSE) {
	    while (($line = fgetcsv($handle, 1000, ",")) !== FALSE) {
		    	array_push($dataArray, $line);
	    }
	    fclose($handle);
	}

	echo "<button><a href=\"/calculator/index.html\">Back to Calculator</a></button>";
	echo "<h1>Calculations</h1>";
	echo "<table><tr><th>Sum</th><th>IP Address</th><th>Date</th><th>Browser</th></tr>";

	foreach (array_reverse($dataArray) as $line) {

		echo "<tr>";

		foreach ($line as $cell) {
			echo "<td>" . $cell . "</td>";
		}

		echo "</tr>";
	}

	echo "</table>";

?>
