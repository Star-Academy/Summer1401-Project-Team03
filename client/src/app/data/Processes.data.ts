import {ItemType} from '../enums/ItemType.enum';

import {ProcessType} from '../enums/ProcessType.enum';
import {Paramether} from '../models/Parameter.interface';

export interface ProcessSchema {
    id: number;
    title: string;
    icon: string;
    parameters: {[key in string]: Paramether};
}

export type ProcessInfo = {
    [key in ProcessType]: ProcessSchema;
};

const inputTypes = [
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
];

export const PROCESS: ProcessInfo = {
    filter: {
        id: 0,
        title: 'filter',
        icon: 'filter',
        parameters: {
            fields_to_filter: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            operators: {
                type: ItemType.SELECT,
                label: 'condition',
                options: [
                    {
                        value: '=',
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
            values: {
                type: ItemType.TEXT_INPUT,
                label: 'value',
                value: '',
            },
            types: {
                type: ItemType.SELECT,
                label: 'value type',
                options: inputTypes,
                value: 'text',
            },
        },
    },
    aggregate: {
        id: 1,
        title: 'aggregation',
        icon: 'aggregate',
        parameters: {
            fields_to_aggregate: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            aggregate_functions: {
                type: ItemType.SELECT,
                label: 'function',
                options: [
                    {
                        value: 'count',
                        title: 'count',
                    },
                    {
                        value: 'sum',
                        title: 'sum',
                    },
                    {
                        value: 'avg',
                        title: 'average',
                    },
                    {
                        value: 'min',
                        title: 'min',
                    },
                    {
                        value: 'max',
                        title: 'max',
                    },
                ],
                value: '',
            },
            fields_to_group_by: {
                type: ItemType.TEXT_INPUT,
                label: 'group by',
                value: '',
            },
        },
    },
    data_sampling: {
        id: 2,
        title: 'data sampling',
        icon: 'data_sampling',
        parameters: {
            number: {
                type: ItemType.TEXT_INPUT,
                text_type: 'number',
                label: 'number of rows',
                value: '',
            },
        },
    },
    field_remover: {
        id: 3,
        title: 'remove field',
        icon: 'fieldRemove',
        parameters: {
            fields_to_remove: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
        },
    },
    field_renamer: {
        id: 4,
        title: 'rename field',
        icon: 'fieldRename',
        parameters: {
            fields_to_rename: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            new_names: {
                type: ItemType.TEXT_INPUT,
                label: 'new name',
                value: '',
            },
        },
    },
    field_selector: {
        id: 5,
        title: 'field selector',
        icon: 'field_selector',
        parameters: {
            fields_to_select: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
        },
    },
    hash: {
        id: 6,
        title: 'data hashing',
        icon: 'hash',
        parameters: {
            fields_to_hash: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
        },
    },
    type_converter: {
        id: 7,
        title: 'type converter',
        icon: 'typeConverter',
        parameters: {
            fields: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            types: {
                type: ItemType.SELECT,
                label: 'type',
                options: inputTypes,
                value: 'integer',
            },
        },
    },
    join: {
        id: 8,
        title: 'join',
        icon: 'join',
        parameters: {
            file_id: {
                label: 'dataset',
                type: ItemType.SELECT,
                options: [],
                value: '',
            },
            join_type: {
                label: 'join type',
                type: ItemType.SELECT,
                options: [
                    {
                        value: 'join',
                        title: 'join',
                    },
                    {
                        value: 'inner join',
                        title: 'inner join',
                    },
                    {
                        value: 'outer join',
                        title: 'outer join',
                    },
                    {
                        value: 'left join',
                        title: 'left join',
                    },
                    {
                        value: 'right join',
                        title: 'right join',
                    },
                ],
                value: '',
            },
            l_fields: {
                type: ItemType.TEXT_INPUT,
                label: 'left field',
                value: '',
            },
            r_fields: {
                type: ItemType.TEXT_INPUT,
                label: 'right field',
                value: '',
            },
            operators: {
                type: ItemType.SELECT,
                label: 'operator',
                options: [
                    {
                        value: '=',
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
        },
    },
    replicate: {
        id: 9,
        title: 'replicate',
        icon: 'join',
        parameters: {},
    },
    csv_loader: {
        id: 10,
        title: 'destination',
        icon: 'source',
        parameters: {},
    },
    csv_extractor: {
        id: 11,
        title: 'source',
        icon: 'source',
        parameters: {},
    },
    json_extractor: {
        id: 12,
        title: 'source',
        icon: 'source',
        parameters: {},
    },
    json_loader: {
        id: 13,
        title: 'destination',
        icon: 'source',
        parameters: {},
    },
    math: {
        id: 14,
        title: 'math',
        icon: 'math',
        parameters: {
            fields: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            should_create_new_column: {
                type: ItemType.SWITCH,
                label: 'should create new column',
                value: true,
            },
            values: {
                type: ItemType.TEXT_INPUT,
                label: 'value',
                value: '',
            },
            operators: {
                type: ItemType.SELECT,
                label: 'operator',
                value: '',
            },
        },
    },
    data_cleanser: {
        id: 15,
        title: 'data cleanser',
        icon: 'dataCleanser',
        parameters: {
            fields: {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                value: '',
            },
            default_values: {
                type: ItemType.TEXT_INPUT,
                label: 'default value',
                value: '',
            },
            types: {
                type: ItemType.SELECT,
                label: 'type',
                options: inputTypes,
                value: 'string',
            },
        },
    },
    concatenate: {
        id: 16,
        title: 'concatenate',
        icon: 'concatenate',
        parameters: {
            first_fields: {
                type: ItemType.TEXT_INPUT,
                label: 'first field',
                value: '',
            },
            second_fields: {
                type: ItemType.TEXT_INPUT,
                label: 'second field',
                value: '',
            },
            seperator: {
                type: ItemType.TEXT_INPUT,
                label: 'seperator',
                value: '_',
            },
            new_names: {
                type: ItemType.TEXT_INPUT,
                label: 'new column',
                value: '',
            },
        },
    },
};
