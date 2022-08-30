import {ProcessType, customProcessType} from '../enums/ProcessType.enum';
import {ItemType} from '../enums/ItemType.enum';

export interface ProcessSchema {
    title: string;
    icon: string;
    items: any[];
}

export type ProcessInfo = {
    [key in ProcessType]: ProcessSchema;
};

export const PROCESS: ProcessInfo = {
    source: {
        title: 'source',
        icon: 'source',
        items: [],
    },
    destination: {
        title: 'destination',
        icon: 'source',
        items: [],
    },
    join: {
        title: 'join',
        icon: 'join',
        items: [],
    },
    replicate: {
        title: 'replicate',
        icon: 'join',
        items: [],
    },
    field_remove: {
        title: 'remove field',
        icon: 'fieldRemove',
        items: [],
    },
    field_rename: {
        title: 'rename field',
        icon: 'fieldRename',
        items: [],
    },
    filter: {
        title: 'filter',
        icon: 'filter',
        items: [
            {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                field: 'fields',
                value: '',
            },
            {
                type: ItemType.SELECT,
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
                label: 'condition',
                field: 'condition',
                value: '==',
            },
            {
                type: ItemType.TEXT_INPUT,
                label: 'value',
                field: 'value',
                value: '',
            },
        ],
    },
    hash: {
        title: 'data hashing',
        icon: 'hash',
        items: [
            {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                field: 'field to remove',
                value: '',
            },
        ],
    },

    type_converter: {
        title: 'type converter',
        icon: 'typeConverter',
        items: [
            {
                type: ItemType.TEXT_INPUT,
                label: 'field',
                field: 'fields',
                value: '',
            },
            {
                type: ItemType.DATA_LIST,
                label: 'type',
                field: 'types',
                options: [
                    {
                        value: 'string',
                        title: 'string',
                    },
                    {
                        value: 'date',
                        title: 'date',
                    },
                    {
                        value: 'int',
                        title: 'int',
                    },
                    {
                        value: 'float',
                        title: 'float',
                    },
                ],
                value: 'int',
            },
        ],
    },
};
