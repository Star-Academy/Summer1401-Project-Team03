// export enum ProcessType {
//     SOURCE = 'SOURCE',
//     DESTINATION = 'DESTINATION',
//     FILTER = 'FILTER',
//     FIELD_REMOVE = 'FIELD_REMOVE',
//     JOIN = 'JOIN',
//     REPLICATE = 'REPLICATE',
//     FIELD_RENAME = 'FIELD_RENAME',
// }

export const ProcessType: {[key: string]: string} = {
    SOURCE: 'SOURCE',
    DESTINATION: 'DESTINATION',
    FILTER: 'FILTER',
    FIELD_REMOVE: 'FIELD_REMOVE',
    JOIN: 'JOIN',
    REPLICATE: 'REPLICATE',
    FIELD_RENAME: 'FIELD_RENAME',
};

// export enum customProcessType {
//     FILTER = 'FILTER',
//     REPLICATE = 'REPLICATE',
//     FIELD_REMOVE = 'FIELD_REMOVE',
//     JOIN = 'JOIN',
//     FIELD_RENAME = 'FIELD_RENAME',
//     DESTINATION = 'DESTINATION',
// }

export const customProcessType = {
    FILTER: 'FILTER',
    REPLICATE: 'REPLICATE',
    FIELD_REMOVE: 'FIELD_REMOVE',
    JOIN: 'JOIN',
    FIELD_RENAME: 'FIELD_RENAME',
};
