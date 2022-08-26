import {ProcessSchema} from '../data/Processes.data';

export interface PipelineNodeModel {
    id: string;
    title: string;
    processesInfoType: ProcessSchema;
    position: {x: number; y: number};
    leaderLines: LeaderLinesModel[];
    openedSettingModal: boolean;
    pipelines: PipelineNodeModel[];
    isReplicate: boolean;
}

export interface LeaderLinesModel {
    id: string;
    withId: string;
    leaderLineObj: any;
}
