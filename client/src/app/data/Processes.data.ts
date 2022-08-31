import {ItemType} from '../enums/ItemType.enum';

import {ProcessType} from '../enums/ProcessType.enum';
import {Paramether} from '../models/Parameter.interface';

export interface ProcessSchema {
    id: number;
    title: string;
    icon: string;
    paramethers: {[key in string]: Paramether};
}

export type ProcessInfo = {
    [key in ProcessType]: ProcessSchema;
};

export const PROCESS: ProcessInfo = {
    filter: {
        id: 1,
        title: 'filter',
        icon: 'filter',
        paramethers: {
            fields: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            condition: {
                type: ItemType.SELECT,
                label: 'condition',
                options: [
                    {
                        value: '==',
                        title: '==',
                    },
                    {
                        value: '!=',
                        title: '!=',
                    },
                    {
                        value: '>',
                        title: '>',
                    },
                    {
                        value: '<',
                        title: '<',
                    },
                    {
                        value: '>=',
                        title: '>=',
                    },
                    {
                        value: '<=',
                        title: '<=',
                    },
                ],
                value: '==',
            },
            value: {
                type: ItemType.TEXT_INPUT,
                label: 'value',
                value: '',
            },
        },
    },
    aggregate: {
        id: 1,
        title: 'aggregation',
        icon: 'aggregate',
        paramethers: {
            fields_to_aggregate: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            aggregate_functions: {
                type: ItemType.SELECT,
                label: 'function',
                options: [],
                value: '',
            },
        },
    },
    field_remover: {
        id: 3,
        title: 'remove field',
        icon: 'fieldRemove',
        paramethers: {},
    },
    field_renamer: {
        id: 4,
        title: 'rename field',
        icon: 'fieldRename',
        paramethers: {},
    },
    data_sampling: {
        id: 0,
        title: 'data sampling',
        icon: 'data_sampling',
        paramethers: {},
    },
    field_selector: {
        id: 0,
        title: 'field selector',
        icon: 'field_selector',
        paramethers: {},
    },
    math: {id: 0, title: 'math', icon: 'math', paramethers: {}},
    csv_loader: {
        id: 0,
        title: 'destination',
        icon: 'source',
        paramethers: {},
    },
    csv_extractor: {
        id: 0,
        title: 'source',
        icon: 'source',
        paramethers: {},
    },
    json_loader: {
        id: 0,
        title: 'destination',
        icon: 'source',
        paramethers: {},
    },
    json_extractor: {
        id: 0,
        title: 'source',
        icon: 'source',
        paramethers: {},
    },
    join: {
        id: 0,
        title: 'join',
        icon: 'join',
        paramethers: {
            dataset: {
                label: 'dataset',
                type: ItemType.SELECT,
                options: [],
                value: '',
            },
        },
    },
    replicate: {
        id: 0,
        title: 'replicate',
        icon: 'join',
        paramethers: {},
    },
    hash: {
        id: 0,
        title: 'data hashing',
        icon: 'hash',
        paramethers: {
            field_to_remove: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
        },
    },
    type_converter: {
        id: 0,
        title: 'type converter',
        icon: 'typeConverter',
        paramethers: {
            fields: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            types: {
                type: ItemType.SELECT,
                label: 'type',
                options: [
                    {
                        value: 'text',
                        title: 'string',
                    },
                    {
                        value: 'date',
                        title: 'date',
                    },
                    {
                        value: 'integer',
                        title: 'integer',
                    },
                    {
                        value: 'real',
                        title: 'float/double',
                    },
                    {
                        value: 'bool',
                        title: 'boolean',
                    },
                ],
                value: 'integer',
            },
        },
    },
};
