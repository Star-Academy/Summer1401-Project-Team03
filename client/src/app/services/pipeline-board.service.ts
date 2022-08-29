import {Injectable} from '@angular/core';
import {AddNodeServiceModel, PipelineNodeModel, RemoveNodeServiceModel} from '../models/pipeline-node.model';
import {ApiService} from './api.service';
import {PIPELINE_ONE, PIPELINE_NODE_CONFIG, ADD_PIPELINE_NODE, PIPELINE_SET_CONFIG} from '../utils/api.utils';
import {QueryValueType} from '@angular/compiler/src/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PipelineBoardService {
    public constructor(private apiService: ApiService) {}
    public allNode: PipelineNodeModel[] = [];
    public selectedNode: PipelineNodeModel | null = null;
    public selectedNodeConfig: any | null = null;

    public selectedNodeRx = new BehaviorSubject<PipelineNodeModel | null>(null);
    public selectedNodeConfigRx = new BehaviorSubject<any | null>(null);

    public async getAllNode(id: number): Promise<void> {
        const response = await this.apiService.get<any[]>(PIPELINE_ONE, {pipelineID: id});
        this.allNode = response || [];
    }

    public async getNodeConfig(): Promise<void> {
        const response = await this.apiService.get<any>(PIPELINE_NODE_CONFIG);
        this.selectedNodeConfig = response || null;
        this.selectedNodeConfigRx.next(response || null);
    }

    public async setNodeConfig(config: any): Promise<void> {
        this.selectedNodeConfigRx.next(null);
        const response = await this.apiService.post(PIPELINE_SET_CONFIG, config);
        if (response) {
            this.selectedNodeConfig = config;
            this.selectedNodeConfigRx.next(config);
        }
    }

    public counter = 10;
    public async addNode(node: AddNodeServiceModel): Promise<number | null> {
        // const response = (await this.apiService.post(ADD_PIPELINE_NODE, node)) as number;
        const response = this.counter;
        if (response) {
            //return node id
            this.counter++;
            return response;
        }
        return null;
    }

    public async removeNode(nodeInfo: RemoveNodeServiceModel): Promise<void> {
        // await this.apiService.post(ADD_PIPELINE_NODE, nodeInfo);
    }

    //    getSettingNode
    //    sendSettingNode
    //    runUpNode
    //    runNode
}
// QueryValueType
