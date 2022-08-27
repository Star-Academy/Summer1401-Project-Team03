export interface DatasetItemModel {
    id: number;
    name: string;
    createTime: Date;
    openedSettingModal: boolean;
    type: string;
}

export const datasetItemData: DatasetItemModel[] = [
    {
        name: 'ali',
        createTime: new Date(),
        id: 1,
        openedSettingModal: false,
        type: 'csv',
    },
    {
        name: 'covid',
        createTime: new Date(),
        id: 2,
        openedSettingModal: false,
        type: 'json',
    },
    {
        name: 'bijan',
        createTime: new Date(),
        id: 3,
        openedSettingModal: false,
        type: 'csv',
    },
    {
        name: 'code-star',
        createTime: new Date(),
        id: 4,
        openedSettingModal: false,
        type: 'csv',
    },
];
