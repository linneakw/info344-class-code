package main

import (
    "os"
    "log"
    "io"
    "encoding/csv"
    "fmt"
    "strconv"
    "sort"
    "github.com/linneakw/info344-class-code/lab5-godata/zips/record"
    "github.com/dustin/go-humanize"
)


func main() {
    file, err := os.Open("../zip_code_database.csv")
    records := record.NewRecordInfo()
    if err != nil {
        log.Fatal(err)
        os.Exit(404)
    } else {
        reader := csv.NewReader(file)
        fmt.Println(reader.Read())
        maxPop := 0
        for {
            record, err := reader.Read()
            if err == io.EOF {
                break
            }
            if err != nil {
                log.Fatal(err)
            }
            records.TotalRecords++
            records.TypeAmount[record[1]]++
            if s, err := strconv.Atoi(record[14]); err == nil {
                if (s > maxPop) {
                    maxPop = s
                    records.HighestPopulation = record
                }
            }
            fmt.Println(record[1])
        }
        highPopAmt, err := strconv.Atoi(records.HighestPopulation[14])
        if (err != nil) {
            fmt.Print(err)
        }
        fmt.Println("Record with the highest population:")
        fmt.Println(" Zipcode - ", records.HighestPopulation[0])
        fmt.Println(" Population - ", humanize.Comma(int64(highPopAmt)))
        fmt.Println("Total Records: ", humanize.Comma(int64((records.TotalRecords))))
        
        i := 0
        sortedRecords := make([]string, len(records.TypeAmount))
        fmt.Println("Record Types: ")
        for k := range records.TypeAmount {
            sortedRecords[i] = k
            i++
        }
        sort.Strings(sortedRecords)
        for i = 0 ; i < len(sortedRecords); i++ { 
            fmt.Println(sortedRecords[i], humanize.Comma(int64(records.TypeAmount[sortedRecords[i]])))
        }
    }
}