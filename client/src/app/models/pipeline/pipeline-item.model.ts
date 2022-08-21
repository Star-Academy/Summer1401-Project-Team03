export interface PipelineItemModel {
    id: number;
    name: string;
    createAt: Date;
    modifiedAt: Date;
}

export const pipelineItemData: PipelineItemModel[] = [
    {
        name: 'covid',
        createAt: new Date(),
        id: 1,
        modifiedAt: new Date(),
    },
];
