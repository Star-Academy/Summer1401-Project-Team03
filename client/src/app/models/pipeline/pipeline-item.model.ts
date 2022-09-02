export interface PipelineItemModel {
    id: number;
    name: string;
    openedSettingModal: boolean;
}

export const pipelineItemData: PipelineItemModel[] = [
    {
        name: 'code-star',

        id: 1,

        openedSettingModal: false,
    },
    {
        name: 'covid',

        id: 2,

        openedSettingModal: false,
    },
    {
        name: 'angular',

        id: 3,

        openedSettingModal: false,
    },
    {
        name: 'computer data',

        id: 4,

        openedSettingModal: false,
    },
];
