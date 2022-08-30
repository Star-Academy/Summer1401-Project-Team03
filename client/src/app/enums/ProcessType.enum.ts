export enum ProcessType {
    SOURCE = 'source',
    DESTINATION = 'destination',
    FILTER = 'filter',
    FIELD_REMOVE = 'field_remove',
    JOIN = 'join',
    REPLICATE = 'replicate',
    FIELD_RENAME = 'field_rename',
    CSV_LOADER = 'csv_loader',
    CSV_EXTRACTOR = 'csv_extractor',
    HASH = 'hash',
    TYPE_CONVERTER = 'type_converter',
}

export enum customProcessType {
    FILTER = 'filter',
    FIELD_REMOVE = 'field_remove',
    JOIN = 'join',
    REPLICATE = 'replicate',
    FIELD_RENAME = 'field_rename',
    HASH = 'hash',
    TYPE_CONVERTER = 'type_converter',
}
