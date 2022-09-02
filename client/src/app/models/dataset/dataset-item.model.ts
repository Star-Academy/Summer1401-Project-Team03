export interface DatasetItemModel {
    id: number;
    name: string;
    createTime: Date;
    openedSettingModal: boolean;
    type: string;
    length: string;
}

export interface DatasetRenameModel {
    fileId: number;
    category: string;
    newName: string;
}
