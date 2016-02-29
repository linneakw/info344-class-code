package main

import (
    "fmt"
    "github.com/linneakw/info344-class-code/gotypes/structs/person"
)

func main() {
    prs := person.NewPerson("Linnea", "Watson")
    //person.SayHello(prs)
    prs.SayHello()
}


// printf is like 
// %+v = value
// print f prints field names

// map of rune to pointer of node for trie
// hybrid approach, 
// ordered list of string values, store like 20 strings in a slice, or 50 string
// as soon as I get over that threshold, then I will split it


// Trie needs to do two things
// add an entry - method (check slides)
// FindEntries - INCLUDE RETURN VALUES, return a slice of strings.
// slice of all entries that match the prefic string
// also, maximum number of entries to find
//