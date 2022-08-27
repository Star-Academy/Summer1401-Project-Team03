import {ProcessSchema} from '../data/Processes.data';

export interface PipelineNodeModel {
    id: string;
    beforeId: string;
    afterId: string;
    title: string;
    processesInfoType: ProcessSchema;
    position: {x: number; y: number};
    openedSettingModal: boolean;
}

export interface LeaderLineModel {
    beforeId: string;
    currentId: string;
    afterId: string;
    leaderLineObj: any;
}
