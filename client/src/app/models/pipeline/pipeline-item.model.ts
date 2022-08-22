export interface PipelineItemModel {
    id: number;
    name: string;
    createAt: Date;
    modifiedAt: Date;
    openedSettingModal: boolean;
}

export const pipelineItemData: PipelineItemModel[] = [
    {
        name: 'code-star',
        createAt: new Date(),
        id: 1,
        modifiedAt: new Date(),
        openedSettingModal: false,
    },
    {
        name: 'covid',
        createAt: new Date(),
        id: 2,
        modifiedAt: new Date(),
        openedSettingModal: false,
    },
    {
        name: 'angular',
        createAt: new Date(),
        id: 3,
        modifiedAt: new Date(),
        openedSettingModal: false,
    },
    {
        name: 'computer data',
        createAt: new Date(),
        id: 4,
        modifiedAt: new Date(),
        openedSettingModal: false,
    },
];
