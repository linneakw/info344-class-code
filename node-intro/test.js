'use strict';

var x = 1;

function doubleIt(x) {
    x = x * 2;
}

doubleIt(x);
console.log(x);

// returns x because parameter 

var name = 'Dave';

function getHello(name) {
    return function() {
        console.log(name);
    }
}

var sayHello = getHello(name);
name = 'Fred';
sayHello();

// returns Dave, because of enclosures
// closure, when you return a function from a function, or when you
// declare an anonymous function inline, that function has access to all of the
// stack variables that were there at the time it was returned
