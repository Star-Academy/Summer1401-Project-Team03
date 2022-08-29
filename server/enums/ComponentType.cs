﻿namespace server.Enums;

public enum ComponentType
{
    Filter,
    Aggregate,
    DataSampling,
    FieldRemover, //ok
    FieldRenamer, //ok
    FieldSelector, //ok
    Hash, //ok
    TypeConverter, //ok
    Join,
    CSVLoader, //ok
    CSVExtractor, //ok
    JSONExtractor,
    JSONLoader, 
    Math
}