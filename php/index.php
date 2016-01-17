<?php
$url = parse_url($_SERVER['REQUEST_URI']);
// $_SERVER is an associative array, a set of name and value pairs
// like a map, dictionary, hash table, etc. 
// php arrays are all associative arrays, if you want one ordered you 
// make the keys numbers like 0, 1, 2, 3
// parse_url parses url into parts like domain, protocol, and path
$name = substr($url['path'], 1);
if (strlen($name) == 0) {
    $name = 'World';
}
// path will always return a forward slash

// important to name php files .php because apache will
// recognize and send to php runtime
// php is a file based webserver. Everything has to match paths

//emmet cheat sheet ! and tab autocompletes html
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- meta:vp -->
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Hello <?= htmlentities($name) ?></title>
</head>
<body>
    <!-- ?= // implies echo, enters the result in -->
    <h1>Hello <?= htmlentities($name) ?></h1>
    <!-- html entities any outcome that you output to the page -->
   
</body>
</html>