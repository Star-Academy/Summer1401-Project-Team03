import {ProcessType, customProcessType} from '../enums/ProcessType.enum';
import {ItemType} from '../enums/ItemType.enum';
import {Paramether} from '../models/Paramether.interface';

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
    source: {
        id: 0,
        title: 'source',
        icon: 'source',
        paramethers: {},
    },
    destination: {
        id: 0,
        title: 'destination',
        icon: 'source',
        paramethers: {},
    },
    join: {
        id: 0,
        title: 'join',
        icon: 'join',
        paramethers: {},
    },
    replicate: {
        id: 0,
        title: 'replicate',
        icon: 'join',
        paramethers: {},
    },
    field_remove: {
        id: 0,
        title: 'remove field',
        icon: 'fieldRemove',
        paramethers: {},
    },
    field_rename: {
        id: 0,
        title: 'rename field',
        icon: 'fieldRename',
        paramethers: {},
    },
    filter: {
        id: 0,
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
                type: ItemType.DATA_LIST,
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
