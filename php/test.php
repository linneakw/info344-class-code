Hey this is some content above the code
<?php
$name = 'Funky';
// typless/loosely typed. aren't declared with a data type
// have to start with $
$fullName = $name . 'Jamz';
// period is like a + in regular language, concatenation

class Person {
    protected $name;
    
    public function __construct($n) {
        $this->name = $n;
    }
    
    public function getName() {
        return $this->name;
    }
}

// parameter names also have to have $
function foo($bar) {
    echo "Hey this is the foo fighting function\n";
}

echo "Hello $name \n";
foo('bar');
// write to the output the string literal
//single quotes, nothing interpreted within string
// double quotes, allows you to use \n etc.
// can also embed variables in double quotes
?>
Hey this is is some content below