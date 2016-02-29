package main

import (
    "fmt"
)

func func main() {
    s := "Hello World!"
    
    for idx, r := range s {
        fmt.Println(idx, r)
    }
}