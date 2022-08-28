import {ProcessSchema} from '../data/Processes.data';

export interface PipelineNodeModel {
    id: string;
    beforeId: string;
    afterId: string;
    title: string;
    processesInfoType: ProcessSchema;
    position: {x: number; y: number};
    openedSettingModal: boolean;
    leaderlines: LeaderLineModel[];
}

export interface LeaderLineModel {
    currentId: string;
    withId: string;
    leaderLineObj: any;
}
