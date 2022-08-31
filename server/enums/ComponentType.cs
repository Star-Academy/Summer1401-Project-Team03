namespace server.enums;

public enum ComponentType
{
    Filter,
    Aggregate, //ok
    DataSampling, //ok
    FieldRemover, //ok
    FieldRenamer, //ok
    FieldSelector, //ok
    Hash, //ok
    TypeConverter, //ok
    Join,
    Replicate,
    CSVLoader, //ok
    CSVExtractor, //ok
    JSONExtractor,
    JSONLoader,
    Math,  //ok
    DataCleanser, //ok
    Concatenate,
    Python
}