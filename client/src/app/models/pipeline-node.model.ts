import {customProcessType, ProcessType} from '../enums/ProcessType.enum';
import {TableColumn} from '../components/data-table/models/table-column.model';
import {IoType} from '../pages/pipeline/components/bottom-bar/enums/io-type.enum';

export interface PipelineNodeModel {
    id: number;
    beforeId: number;
    afterId: number;
    title: string;
    processesInfoType: number; //TODO edit
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
    type: number;
}

export interface NodeAddInfoModel {
    beforeId: number;
    afterId: number;
    position: {x: number; y: number};
}

export interface RemoveNodeServiceModel {
    pipelineID: number;
    componentID: number;
}

export interface RenameNodeServiceModel {
    pipelineId: number;
    componentId: number;
    newTitle: string;
}

export interface AddNodeServiceModel {
    pipelineID: number;
    previousComponentId: number;
    nextComponentId: number;
    title: string;
    type: number;
    position: {x: number; y: number};
}

export interface ChangeComponentPositionServiceModel {
    pipelineID: number;
    componentID: number;
    position: {x: number; y: number};
}

export interface GetAllNodeServiceModel {
    id: number;
    name: string;
    destinationIDs: number[];
    componentInformations: ComponentInformationModel[];
}

export interface RunUpToNodeServiceModel {
    columns: TableColumn[];
    cells: any[];
}

export interface ComponentInformationModel {
    id: number;
    type: string;
    title: string;
    nextIds: number[];
    previousIds: number[];
    position: {x: number; y: number};
    parameters: {
        additionalProp1: string[];
        additionalProp2: string[];
        additionalProp3: string[];
    };
}

export interface PreviewTableData {
    inputColumns: TableColumn[];
    outputColumns: TableColumn[];

    inputRows: string[][];
    outputRows: string[][];

    ioType: IoType;
}
