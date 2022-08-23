export interface DatasetItemModel {
    id: number;
    name: string;
    createAt: Date;
    modifiedAt: Date;
    openedSettingModal: boolean;
    fileType: string;
    size: string;
}

export const datasetItemData: DatasetItemModel[] = [
    {
        name: 'ali',
        createAt: new Date(),
        id: 1,
        modifiedAt: new Date(),
        openedSettingModal: false,
        fileType: 'csv',
        size: '2.3MB',
    },
    {
        name: 'covid',
        createAt: new Date(),
        id: 2,
        modifiedAt: new Date(),
        openedSettingModal: false,
        fileType: 'json',
        size: '0.4MB',
    },
    {
        name: 'bijan',
        createAt: new Date(),
        id: 3,
        modifiedAt: new Date(),
        openedSettingModal: false,
        fileType: 'csv',
        size: '7.5MB',
    },
    {
        name: 'code-star',
        createAt: new Date(),
        id: 4,
        modifiedAt: new Date(),
        openedSettingModal: false,
        fileType: 'csv',
        size: '0.9MB',
    },
];
