import {ProcessType} from '../enums/ProcessType.enum';

export interface ProcessSchema {
    title: string;
    icon: string;
    items: any[];
}

type ProcessInfo = {
    [key in ProcessType]: ProcessSchema;
};

export const PROCESS: ProcessInfo = {
    JOIN: {
        title: 'join',
        icon: '',
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
