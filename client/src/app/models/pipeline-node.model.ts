import {customProcessType, ProcessType} from '../enums/ProcessType.enum';

export interface PipelineNodeModel {
    id: number;
    beforeId: number;
    afterId: number;
    title: string;
    processesInfoType: ProcessType;
    position: {x: number; y: number};
    openedSettingModal: boolean;
    leaderlines: LeaderLineModel[];
}

export interface LeaderLineModel {
    currentId: number;
    withId: number;
    leaderLineObj: any;
}

export interface NodeRemoveInfoModel {
    nodeId: number;
    beforeId: number;
    afterId: number;
}

export interface NodeAddInfoModel {
    beforeId: number;
    afterId: number;
    position: {x: number; y: number};
}

export interface RemoveNodeServiceModel {
    nodeId: number;
    beforeId: number;
    afterId: number;
}

export interface AddNodeServiceModel {
    beforeId: number;
    afterId: number;
    type: customProcessType;
    position: {x: number; y: number};
}
