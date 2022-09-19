namespace server.enums;

public enum ComponentType
{
    Filter, //0
    Aggregate, //1
    DataSampling, //2
    FieldRemover, //3
    FieldRenamer, //4
    FieldSelector, //5
    Hash, //6
    TypeConverter, //7
    Join, //8
    Replicate, //9
    CsvLoader, //10
    CsvExtractor, //11
    JsonExtractor, //12
    JsonLoader, //13
    Math,  //14
    DataCleanser, //15
    Concatenate, //16
    Python //17
}