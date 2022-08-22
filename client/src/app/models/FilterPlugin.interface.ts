export const FILTER_PLUGIN = {
    id: '',
    type: 'filter',
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
};
