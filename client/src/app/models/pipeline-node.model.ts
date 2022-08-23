import {ProcessSchema} from '../data/Processes.data';

export interface PipelineNodeModel {
    id: string;
    title: string;
    processesInfoType: ProcessSchema;
    position: {x: number; y: number};
}
