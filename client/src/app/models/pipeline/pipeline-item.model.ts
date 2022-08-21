export interface PipelineItemModel {
    id: number;
    name: string;
    createAt: Date;
    modifiedAt: Date;
    openedSettingModal: boolean;
}

export const pipelineItemData: PipelineItemModel[] = [
    {
        name: 'covid',
        createAt: new Date(),
        id: 1,
        modifiedAt: new Date(),
        openedSettingModal: false,
    },
    {
        name: 'covid2',
        createAt: new Date(),
        id: 2,
        modifiedAt: new Date(),
        openedSettingModal: false,
    },
];
