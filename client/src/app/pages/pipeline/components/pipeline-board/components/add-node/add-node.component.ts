import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
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
export class addNodeComponent {
    public processes: ProcessInfo = PROCESS;

    @ViewChild('ProcessAdd') public modal!: ModalComponent;
    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();
    public nodeData!: NodeAddInfoModel;
    public pipelineBoardId!: number;
    public nodeTitle: string = 'new node';

    public constructor(private pipelineBoardService: PipelineBoardService) {}

    public customProcessType(): customProcessType[] {
        const keys = Object.keys(customProcessType);
        return keys.map((type) => type as customProcessType);
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

    public async addNodeHandle(type: customProcessType): Promise<void> {
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
                type: customProcessType.DESTINATION,
            };

            const nodeDestinationId = await this.pipelineBoardService.addNode(addNodeDestinationService);
            if (nodeDestinationId) {
                const newNodeDestination: PipelineNodeModel = {
                    id: nodeDestinationId,
                    title: 'target',
                    processesInfoType: ProcessType[customProcessType.DESTINATION],
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
                };

                const nodeId = await this.pipelineBoardService.addNode(addNodeService);
                if (nodeId) {
                    const newNodeComponent: PipelineNodeModel = {
                        id: nodeId,
                        title,
                        processesInfoType: ProcessType[type],
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

        const addNodeService: AddNodeServiceModel = {
            pipelineID: this.pipelineBoardId,
            previousComponentId: this.nodeData.beforeId,
            nextComponentId: this.nodeData.afterId,
            position: newPosition,
            type,
        };

        const nodeId = await this.pipelineBoardService.addNode(addNodeService);
        if (nodeId) {
            const newNodeComponent: PipelineNodeModel = {
                id: nodeId,
                title,
                processesInfoType: ProcessType[type],
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
