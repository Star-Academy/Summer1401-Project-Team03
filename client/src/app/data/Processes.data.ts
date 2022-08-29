import {ProcessType, customProcessType} from '../enums/ProcessType.enum';

export interface ProcessSchema {
    title: string;
    icon: string;
    items: any[];
}

export type ProcessInfo = {
    [key in ProcessType]: ProcessSchema;
};

export const PROCESS: ProcessInfo = {
    SOURCE: {
        title: 'source',
        icon: 'source',
        items: [],
    },
    DESTINATION: {
        title: 'destination',
        icon: 'source',
        items: [],
    },
    JOIN: {
        title: 'join',
        icon: 'join',
        items: [],
    },
    REPLICATE: {
        title: 'replicate',
        icon: 'join',
        items: [],
    },
    FIELD_REMOVE: {
        title: 'remove field',
        icon: 'fieldRemove',
        items: [],
    },
    FIELD_RENAME: {
        title: 'rename field',
        icon: 'fieldRename',
        items: [],
    },
    FILTER: {
        title: 'filter',
        icon: 'filter',
        items: [
            {
                type: 'TEXT_INPUT',
                label: 'field',
                value: '',
            },
            {
                type: 'SELECT',
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
                value: '',
            },
            {
                type: 'TEXT_INPUT',
                label: 'value',
                value: '',
            },
        ],
    },
};
