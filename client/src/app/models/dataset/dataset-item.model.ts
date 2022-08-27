export interface DatasetItemModel {
    id: string;
    name: string;
    createTime: Date;
    openedSettingModal: boolean;
    type: string;
    length: string;
}

export const datasetItemData: DatasetItemModel[] = [
    {
        name: 'ali',
        createTime: new Date(),
        id: '1',
        length: '12',
        openedSettingModal: false,
        type: 'csv',
    },
    {
        name: 'covid',
        createTime: new Date(),
        id: '2',
        length: '12',
        openedSettingModal: false,
        type: 'json',
    },
    {
        name: 'bijan',
        createTime: new Date(),
        id: '3',
        length: '12',
        openedSettingModal: false,
        type: 'csv',
    },
    {
        name: 'code-star',
        createTime: new Date(),
        id: '4',
        length: '12',
        openedSettingModal: false,
        type: 'csv',
    },
];
