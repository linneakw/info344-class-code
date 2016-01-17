<?
$num = rand(0, 100);
echo "your new random value is $num \n";
date_default_timezone_set("America/Los_Angeles");
function monthArray() {
    $months = array();
    for($i = 1; $i < 13; $i++) {
        $newMonth = 
        $months[$i] = date('F', mktime(0,0,0,$i, 1, date('Y')));;
        echo $newMonth;
    }
    echo "\n";
    sort($months);
    foreach ($months as $m) {
        echo $m;
    }
}
monthArray();


?>