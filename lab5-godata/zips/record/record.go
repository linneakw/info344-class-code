package record

// RecordInfo does
type RecordInfo struct {
    TotalRecords int
    TypeAmount map[string]int
    HighestPopulation []string
}
// NewRecordInfo is a constructor for RecordInfo
func NewRecordInfo() *RecordInfo {
    return &RecordInfo {
        TotalRecords: 0, 
        TypeAmount: make(map[string]int),
        HighestPopulation: nil}
}
