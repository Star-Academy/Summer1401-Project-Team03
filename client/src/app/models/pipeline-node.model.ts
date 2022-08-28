import {ProcessType} from '../enums/ProcessType.enum';

export interface PipelineNodeModel {
    id: string;
    beforeId: string;
    afterId: string;
    title: string;
    processesInfoType: ProcessType;
    position: {x: number; y: number};
    openedSettingModal: boolean;
    leaderlines: LeaderLineModel[];
}

export interface LeaderLineModel {
    currentId: string;
    withId: string;
    leaderLineObj: any;
}
