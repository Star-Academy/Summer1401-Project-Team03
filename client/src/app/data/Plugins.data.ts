import {ProcessType} from '../enums/ProcessType.enum';

type ProcessInfo = {
    [key in ProcessType]: {
        title: string;
        icon: string;
    };
};

export const PLUGIN: ProcessInfo = {
    JOIN: {
        title: 'join',
        icon: '',
    },
    FIELD_REMOVAL: {
        title: 'remove field',
        icon: '',
    },
    FIELD_RENAME: {
        title: 'rename field',
        icon: '',
    },
    FILTER: {
        title: 'filter',
        icon: '',
    },
};
