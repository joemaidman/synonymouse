<?php
$WORD = $_GET['word'];
//Enter your big huge thesaurus API key below (https://words.bighugelabs.com/)
$API_KEY = 'xxxxxxxxxxxxxxxxxxxxxx';
$service_url = "http://words.bighugelabs.com/api/2/". $API_KEY. "/" . $WORD . "/json";
$file = fopen("count.txt", "r");
$coutCurr = fread($file,filesize("count.txt"));
fclose($file);
$coutCurr = $coutCurr + 1;
$fileW = fopen("count.txt", "w");
fwrite($fileW, $coutCurr);
fclose($fileW);
//  Initiate curl
$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$service_url);
// Execute
$result=curl_exec($ch);
// Closing
curl_close($ch);

echo $_GET['callback'] . '(' . json_encode($result) . ');'; //echo substr_replace($result ,"",-1); ;


?>