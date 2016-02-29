package person

import (
    "fmt"
)

// Person capitol, anything exported has capital letter
type Person struct {
    FirstName string 
    LastName string
}

// NewPerson constructor, New and the class name, treat just like a constructor
func NewPerson(first string, last string) *Person {
    return &Person{FirstName: first, LastName: last}
}

// SayHello by putting the arguments on the left
func (person *Person) SayHello() {
    fmt.Println("Hello,", person.FirstName, person.LastName)
}
// say hello will act as if it's a method of a person object
// person.SayHello(prs)
// turns into  prs.SayHello