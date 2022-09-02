import {Injectable} from '@angular/core';
import {
    AddDestinationNodeServiceModel,
    AddNodeServiceModel,
    ChangeComponentPositionServiceModel,
    ComponentInformationModel,
    GetAllNodeServiceModel,
    PipelineNodeModel,
    PreviewTableData,
    RemoveNodeServiceModel,
    RenameNodeServiceModel,
} from '../models/pipeline-node.model';
import {ApiService} from './api.service';
import {
    ADD_PIPELINE_CHANGE_POSITION,
    ADD_PIPELINE_NODE,
    DELETE_PIPELINE_NODE,
    PIPELINE_NODE_CONFIG,
    PIPELINE_ONE,
    PIPELINE_RUN_ALL,
    PIPELINE_RUN_UP_TO,
    PIPELINE_SET_CONFIG,
    RENAME_PIPELINE_NODE, ADD_PIPELINE_DESTINATION,
} from '../utils/api.utils';
import {BehaviorSubject} from 'rxjs';
import {PROCESS, ProcessSchema} from '../data/Processes.data';
import {IoType} from '../pages/pipeline/components/bottom-bar/enums/io-type.enum';
import {TableColumn} from '../components/data-table/models/table-column.model';
import {ItemType} from '../enums/ItemType.enum';
import {SnackbarService} from './snackbar.service';
import {SnackbarObject} from '../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../components/snackbar/enums/snackbar-theme';

@Injectable({
    providedIn: 'root',
})
export class PipelineBoardService {
    public allNode: PipelineNodeModel[] = [];
    public selectedNode: PipelineNodeModel | null = null;
    public selectedNodeConfig: any | null = null;
    public selectedPipelineBoardId!: number;
    public selectedPipelineBoardTitle!: string;

    public constructor(private apiService: ApiService, private snackbarService: SnackbarService) {
        this.getNodeData();
    }

    public selectedNodeRx = new BehaviorSubject<PipelineNodeModel | null>(null);
    public selectedNodeConfigRx = new BehaviorSubject<any | null>(null);

    public nodePreview: PreviewTableData = {
        inputColumns: [],
        outputColumns: [],
        inputRows: [],
        outputRows: [],
        ioType: IoType.BOTH,
    };

    public async getAllNode(): Promise<PipelineNodeModel[]> {
        const pipelineId = this.selectedPipelineBoardId;
        const response =
            (await this.apiService.get<GetAllNodeServiceModel>(PIPELINE_ONE, {pipelineID: pipelineId})) || null;
        if (response) {
            this.allNode = this.convertComponentInformationsToPielineNodeModel(response.componentInformations);
            this.selectedPipelineBoardTitle = response.name;
            return this.allNode;
        }
        return [];
    }

    private async getNodeConfig(id: number): Promise<void> {
        const response = await this.apiService.get<any>(PIPELINE_NODE_CONFIG, {
            pipelineId: this.selectedPipelineBoardId,
            componentId: id,
        });
        this.selectedNodeConfig = response.parameters || null;
        this.selectedNodeConfigRx.next(this.selectedNodeConfig);
    }

    public async setNodeConfig(config: any): Promise<void> {
        const body = Object.keys(config).reduce((prev, key) => {
            const value =
                config[key].type === ItemType.TEXT_INPUT ? config[key].value.split(', ') : [config[key].value];

            return {...prev, [key]: value};
        }, {});
        const response = await this.apiService.post(
            PIPELINE_SET_CONFIG,
            {pipelineId: this.selectedPipelineBoardId, componentId: this.selectedNode?.id},
            body
        );
        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('configuration set successfully', SnackbarTheme.SUCCESS));
            this.selectedNodeConfig = config;
            await this.runUpToNode();
        } else {
            // todo snack error
        }
    }

    public async addNode(addNodeInfo: AddNodeServiceModel): Promise<number | null> {
        const fakeData = {...addNodeInfo};
        const response =
            (await this.apiService.post<number>(ADD_PIPELINE_NODE, {...fakeData}, fakeData.position)) || undefined;
        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('process created successfully', SnackbarTheme.SUCCESS));
            //return node id
            return response;
        }
        return null;
    }

    public async addDestinationNode(addNodeInfo: AddDestinationNodeServiceModel): Promise<number | null> {
        const fakeData = {...addNodeInfo};
        const response =
            (await this.apiService.post<number>(ADD_PIPELINE_DESTINATION, {...fakeData}, fakeData.position)) || undefined;
        if (response) {
            //return node id
            return response;
        } else {
            // todo snack error
        }
        return null;
    }

    public async removeNode(removeNodeInfo: RemoveNodeServiceModel): Promise<void> {
        const response = await this.apiService.delete(DELETE_PIPELINE_NODE, {
            pipelineID: +removeNodeInfo.pipelineID,
            componentID: +removeNodeInfo.componentID,
        });
        if (response)
            this.snackbarService.showNewId(new SnackbarObject('process deleted successfully', SnackbarTheme.SUCCESS));
        else {
            // todo snack error
        }
    }

    public async renameNode(renameNodeInfo: RenameNodeServiceModel): Promise<boolean> {
        const response = await this.apiService.put(RENAME_PIPELINE_NODE, renameNodeInfo);

        if (response)
            this.snackbarService.showNewId(new SnackbarObject('process renamed successfully', SnackbarTheme.SUCCESS));
        else {
            // todo snack error
        }

        return !!response;
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
    public async runUpToNode(): Promise<void> {
        this.nodePreview.outputColumns = [];
        this.nodePreview.outputRows = [];

        this.nodePreview.inputColumns = [];
        this.nodePreview.inputRows = [];

        if (this.nodePreview.ioType !== IoType.INPUT) {
            if (
                this.selectedNode?.processesInfoType === PROCESS.json_loader.id ||
                this.selectedNode?.processesInfoType === PROCESS.csv_loader.id
            ) {
                this.nodePreview.ioType = IoType.INPUT;
            } else {
                const response = await this.apiService.get<any[]>(PIPELINE_RUN_UP_TO, {
                    pipelineId: this.selectedPipelineBoardId,
                    componentId: this.selectedNode?.id,
                });

                if (response) {
                    this.snackbarService.showNewId(
                        new SnackbarObject('process output run successfully', SnackbarTheme.SUCCESS)
                    );
                    for (const item of response) delete item['__'];

                    this.nodePreview.outputColumns = Object.keys(response[0]).map((col) => new TableColumn(col));
                    this.nodePreview.outputRows = response.map((row) => Object.values(row as string));
                } else {
                    // todo snack error
                }
            }
        }

        if (this.nodePreview.ioType !== IoType.OUTPUT) {
            if (
                this.selectedNode?.processesInfoType === PROCESS.json_extractor.id ||
                this.selectedNode?.processesInfoType === PROCESS.csv_extractor.id
            ) {
                this.nodePreview.ioType = IoType.OUTPUT;
            } else {
                const response = await this.apiService.get<any[]>(PIPELINE_RUN_UP_TO, {
                    pipelineId: this.selectedPipelineBoardId,
                    componentId: this.selectedNode?.beforeId,
                });

                if (response) {
                    this.snackbarService.showNewId(
                        new SnackbarObject('process input run successfully', SnackbarTheme.SUCCESS)
                    );
                    for (const item of response) delete item['__'];

                    this.nodePreview.inputColumns = Object.keys(response[0]).map((col) => new TableColumn(col));
                    this.nodePreview.inputRows = response.map((row) => Object.values(row as string));
                } else {
                    // todo snack error
                }
            }
        }
    }

    //    runNode

    public async runPipeline(): Promise<boolean> {
        const response = await this.apiService.get<boolean>(PIPELINE_RUN_ALL, {
            pipelineId: this.selectedPipelineBoardId,
        });
        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('pipeline run successfully', SnackbarTheme.SUCCESS));
        } else {
            // todo snack error
        }
        return !!response;
    }

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

    public convertIdToType(id: number): ProcessSchema {
        const type = Object.entries(PROCESS).find((process) => process[1].id === id) || null;
        return (type?.[1] as ProcessSchema) || null;
    }

    private getNodeData(): void {
        this.selectedNodeRx.subscribe((value) => {
            if (!value) {
                return;
            }
            this.getNodeConfig(value.id);
            this.runUpToNode();
        });
    }
}
