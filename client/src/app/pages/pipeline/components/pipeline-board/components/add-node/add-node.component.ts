import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo} from 'src/app/data/Processes.data';
import {customProcessType, ProcessType} from 'src/app/enums/ProcessType.enum';
import {AddNodeServiceModel, NodeAddInfoModel, PipelineNodeModel} from '../../../../../../models/pipeline-node.model';
import {PipelineBoardService} from '../../../../../../services/pipeline-board.service';

let counter = 10;
const ADDITIONAL_LEFT = 300;
const ADDITIONAL_BOTTOM = 160;

@Component({
    selector: 'app-add-node',
    templateUrl: './add-node.component.html',
    styleUrls: ['./add-node.component.scss'],
})
export class addNodeComponent implements OnInit {
    public processes: ProcessInfo = PROCESS;

    @ViewChild('ProcessAdd') public modal!: ModalComponent;
    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();
    public nodeData!: NodeAddInfoModel;
    public pipelineBoardId!: number;
    public nodeTitle: string = 'new node';
    public customProcessType: string[] = [];

    public constructor(private pipelineBoardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.customProcessType = this.customProcessTypeFunction();
    }

    private customProcessTypeFunction(): string[] {
        const keys = Object.values(customProcessType);
        console.log(keys);
        return keys.map((type) => type as string);
    }

    public openModal(
        beforeId: number,
        afterId: number,
        position: {x: number; y: number},
        pipelineBoardId: number
    ): void {
        this.nodeData = {
            beforeId,
            afterId,
            position,
        };
        this.pipelineBoardId = pipelineBoardId;
        this.modal.openModal();
    }

    public async addNodeHandle(type: string): Promise<void> {
        this.modal.closeModal();

        const title = this.nodeTitle;
        let newPosition = {x: this.nodeData.position.x + ADDITIONAL_LEFT, y: this.nodeData.position.y};
        if (type === customProcessType.REPLICATE) {
            newPosition = {x: newPosition.x + ADDITIONAL_LEFT, y: this.nodeData.position.y + ADDITIONAL_BOTTOM};

            const addNodeDestinationService: AddNodeServiceModel = {
                pipelineID: this.pipelineBoardId,
                previousComponentId: this.nodeData.beforeId,
                nextComponentId: this.nodeData.afterId,
                position: newPosition,
                type: ProcessType.DESTINATION,
                title,
            };

            const nodeDestinationId = await this.pipelineBoardService.addNode(addNodeDestinationService);
            if (nodeDestinationId) {
                const newNodeDestination: PipelineNodeModel = {
                    id: nodeDestinationId,
                    title: 'target',
                    processesInfoType: ProcessType.DESTINATION,
                    position: newPosition,
                    openedSettingModal: false,
                    afterId: -1,
                    beforeId: this.nodeData.beforeId,
                    leaderlines: [],
                };
                this.addNodeEmit.emit(newNodeDestination);
                console.log(`add new node with ${newNodeDestination.id} id, Destination`);

                newPosition = {...newPosition, x: newPosition.x - ADDITIONAL_LEFT};
                // New node
                const addNodeService: AddNodeServiceModel = {
                    pipelineID: this.pipelineBoardId,
                    previousComponentId: this.nodeData.beforeId,
                    nextComponentId: nodeDestinationId,
                    position: newPosition,
                    type,
                    title,
                };

                const nodeId = await this.pipelineBoardService.addNode(addNodeService);
                if (nodeId) {
                    const newNodeComponent: PipelineNodeModel = {
                        id: nodeId,
                        title,
                        processesInfoType: type,
                        position: newPosition,
                        openedSettingModal: false,
                        afterId: nodeDestinationId,
                        beforeId: this.nodeData.beforeId,
                        leaderlines: [],
                    };
                    this.addNodeEmit.emit(newNodeComponent);
                    console.log(`add new node with ${newNodeComponent.id} id`);
                }
            }
            return undefined;
        }

        // // TODO Connect to service

        console.log(this.pipelineBoardId);
        const addNodeService: AddNodeServiceModel = {
            pipelineID: this.pipelineBoardId,
            previousComponentId: this.nodeData.beforeId,
            nextComponentId: this.nodeData.afterId,
            position: newPosition,
            type,
            title,
        };

        const nodeId = await this.pipelineBoardService.addNode(addNodeService);
        if (nodeId) {
            const newNodeComponent: PipelineNodeModel = {
                id: nodeId,
                title,
                processesInfoType: type,
                position: newPosition,
                openedSettingModal: false,
                afterId: this.nodeData.afterId,
                beforeId: this.nodeData.beforeId,
                leaderlines: [],
            };
            this.addNodeEmit.emit(newNodeComponent);
            console.log(`add new node with ${newNodeComponent.id} id`);
        }
    }
}
