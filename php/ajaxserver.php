<?php

header('Expires: ' . gmdate('D, d M Y H:i:s', time()) . ' GMT');
header('Content-type: application/json; charset=utf-8');

if (isset($_GET['call'])) {
    if ($_GET['call'] == 'loaddata') {
        echo loaddata();
    }
} else if ($_POST['action'] == 'savedata') {
    echo json_encode(savedata($_POST['colors'],
                               $_POST['shapes']));
}

function savedata($colors, $shapes) {
    $directory = "../data";
    $valid = true;
    $result = '{"status":"fail","error":"Data file not found"}';

    if (is_dir($directory)) {
        $fname = "$directory/data.txt";
        $fh    = fopen($fname, 'w');
        $data  = '"colors":' . $colors
              . ',"shapes":' . $shapes;
        fwrite($fh, $data);
        fclose($fh);
    } else {
        $result = '{"status":"fail"';
        $result .= ',"error":"Directory not found"}';
        $valid = false;
    }

    if ($valid) {
        $result = '{"status":"success"}';
    }

    return $result;
}

function loaddata() {
	$directory = "../data";
    $data = null;
    $result = '{"status":"fail","error":"Data file not found"}';

   	if (is_dir($directory)) {
   		$fname = "$directory/data.txt";
   		if (is_file($fname)) {
            $data = loadDataFile($fname);
            if ($data != '') {
                $result = '{"status":"success",' . $data . '}';
            }
   		}
   	}

	return $result;
}

function loadDataFile($fileName) {
    $arr  = '';
    $file = null;
    $file = @fopen($fileName, "r");

    if ($file === false) {
        return "";
    }

    while (!feof($file)) {
        $arr .= fgets($file);
    }

    fclose($file);
    return $arr;
}
?>