import {Injectable} from '@angular/core';
import {
    AddNodeServiceModel,
    ChangeComponentPositionServiceModel,
    ComponentInformationModel,
    GetAllNodeServiceModel,
    PipelineNodeModel,
    RemoveNodeServiceModel,
} from '../models/pipeline-node.model';
import {ApiService} from './api.service';
import {
    PIPELINE_ONE,
    PIPELINE_NODE_CONFIG,
    ADD_PIPELINE_NODE,
    PIPELINE_SET_CONFIG,
    ADD_PIPELINE_CHANGE_POSITION,
    DELETE_PIPELINE_NODE,
} from '../utils/api.utils';
import {BehaviorSubject} from 'rxjs';
import {ProcessType} from '../enums/ProcessType.enum';
import {PROCESS} from '../data/Processes.data';

@Injectable({
    providedIn: 'root',
})
export class PipelineBoardService {
    public constructor(private apiService: ApiService) {}
    public allNode: PipelineNodeModel[] = [];
    public selectedNode: PipelineNodeModel | null = null;
    public selectedNodeConfig: any | null = null;
    public selectedPipelineBoardId!: number;

    public selectedNodeConfigRx = new BehaviorSubject<any | null>(null);

    public async getAllNode(): Promise<PipelineNodeModel[]> {
        const pipelineId = this.selectedPipelineBoardId;
        const response =
            (await this.apiService.get<GetAllNodeServiceModel>(PIPELINE_ONE, {pipelineID: pipelineId})) || null;
        if (response) {
            this.allNode = this.convertComponentInformationsToPielineNodeModel(response.componentInformations);
            return this.allNode;
        }
        return [];
    }

    public async getNodeConfig(id: number): Promise<void> {
        this.selectedNode = this.allNode.find((node) => node.id === id) || null;
        const response = await this.apiService.get<any>(PIPELINE_NODE_CONFIG, {
            pipelineId: this.selectedPipelineBoardId,
            componentId: id,
        });
        this.selectedNodeConfig = response.parameters || null;
        this.selectedNodeConfigRx.next(this.selectedNodeConfig);
    }

    public async setNodeConfig(config: any): Promise<void> {
        const body = Object.keys(config).reduce((prev, key) => ({...prev, [key]: [config[key].value]}), {});
        const response = await this.apiService.post(
            PIPELINE_SET_CONFIG,
            {pipelineId: this.selectedPipelineBoardId, componentId: this.selectedNode?.id},
            body
        );
        if (response) {
            this.selectedNodeConfig = config;
        }
    }

    public counter = 10;
    public async addNode(addNodeInfo: AddNodeServiceModel): Promise<number | null> {
        const fakeData = {...addNodeInfo};
        const response =
            (await this.apiService.post<number>(ADD_PIPELINE_NODE, {...fakeData}, fakeData.position)) || undefined;
        // const response = this.counter;
        if (response) {
            //return node id
            this.counter++;
            return response;
        }
        return null;
    }

    public async removeNode(removeNodeInfo: RemoveNodeServiceModel): Promise<void> {
        await this.apiService.delete(DELETE_PIPELINE_NODE, {
            pipelineID: +removeNodeInfo.pipelineID,
            componentID: +removeNodeInfo.componentID,
        });
    }

    public async changeComponentPosition(changeNodePositionInfo: ChangeComponentPositionServiceModel): Promise<void> {
        await this.apiService.put(
            ADD_PIPELINE_CHANGE_POSITION,
            {...changeNodePositionInfo},
            changeNodePositionInfo.position
        );
    }

    //    getSettingNode
    //    sendSettingNode
    //    runUpNode
    //    runNode

    // UTILITY
    private convertComponentInformationsToPielineNodeModel(
        components: ComponentInformationModel[]
    ): PipelineNodeModel[] {
        const pipelineNodes: PipelineNodeModel[] = components.map((component) => {
            const converted = {
                id: component.id,
                beforeId: component.previousIds[0],
                afterId: component.nextIds[0],
                title: component.title,
                processesInfoType: this.convertStringTypeToNumber(component.type),
                position: component.position,
                openedSettingModal: false,
                leaderlines: [],
            };
            return converted;
        });
        return pipelineNodes;
    }

    private convertStringTypeToNumber(type: string): number {
        const typeNumber = Object.entries(PROCESS).find((process) => process[0] === type);
        if (typeNumber) return typeNumber[1].id;
        return 0;
    }
}
