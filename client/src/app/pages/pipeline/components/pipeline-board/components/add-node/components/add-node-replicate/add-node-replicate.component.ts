import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../../../../../components/modal/modal.component';
import {PipelineBoardService} from '../../../../../../../../services/pipeline-board.service';
import {AVAILABLE_FILE_TYPES} from '../../../../../../../../data/AvailableFileTypes.data';
import {NewPipeline} from '../../../../../../../../models/NewPipeline.interface';
import {
    AddDestinationNodeServiceModel,
    AddNodeServiceModel,
    NodeAddInfoModel,
    PipelineNodeModel,
} from '../../../../../../../../models/pipeline-node.model';
import {PROCESS} from '../../../../../../../../data/Processes.data';
const ADDITIONAL_LEFT = 300;
const ADDITIONAL_BOTTOM = 160;

@Component({
    selector: 'app-add-node-replicate',
    templateUrl: './add-node-replicate.component.html',
    styleUrls: ['./add-node-replicate.component.scss'],
})
export class AddNodeReplicateComponent {
    @ViewChild('replicateModal') public modal!: ModalComponent;
    @Output() public replicateNodeId = new EventEmitter<number>();
    @Output() public replicateNodeEmit = new EventEmitter<PipelineNodeModel>();
    // public nodeRemoveInfo!: NodeRemoveInfoModel;
    public pipelineBoardId!: number;
    public destName: string = '';
    public nodeData!: NodeAddInfoModel;
    public nodeTitle!: string;

    public constructor(private pipelineBoardService: PipelineBoardService) {}

    public openModal(pipelineBoardId: number, nodeData: NodeAddInfoModel, title: string): void {
        // this.nodeRemoveInfo = {
        //     nodeId,
        //     type,
        // };
        console.log('dakhel replicate hastm');
        this.pipelineBoardId = pipelineBoardId;
        this.nodeData = nodeData;
        this.nodeTitle = title;

        this.modal.openModal();
    }

    public async addDestinationHandle(): Promise<void> {
        this.modal.closeModal();
        let newPosition = {x: this.nodeData.position.x + ADDITIONAL_LEFT, y: this.nodeData.position.y};

        newPosition = {x: newPosition.x + ADDITIONAL_LEFT, y: this.nodeData.position.y + ADDITIONAL_BOTTOM};

        // new destination node
        const addNodeDestinationService: AddDestinationNodeServiceModel = {
            pipelineId: this.pipelineBoardId,
            previousComponentId: this.nodeData.beforeId,
            position: newPosition,
            format: 'exports', //TODO Edit
            fileName: this.destName,
        };

        const nodeDestinationId = await this.pipelineBoardService.addDestinationNode(addNodeDestinationService);
        console.log('node sakhte shod!!!');
        console.log(nodeDestinationId);
        if (nodeDestinationId) {
            const newNodeDestination: PipelineNodeModel = {
                id: nodeDestinationId,
                title: this.destName,
                processesInfoType: PROCESS.csv_loader.id, //TODO Edit
                position: newPosition,
                openedSettingModal: false,
                afterId: -1,
                beforeId: this.nodeData.beforeId,
                leaderlines: [],
            };
            this.replicateNodeEmit.emit(newNodeDestination);
            console.log(`add new node with ${newNodeDestination.id} id, Destination`);

            newPosition = {...newPosition, x: newPosition.x - ADDITIONAL_LEFT};

            // new replicate node
            const addNodeService: AddNodeServiceModel = {
                pipelineID: this.pipelineBoardId,
                previousComponentId: this.nodeData.beforeId,
                nextComponentId: nodeDestinationId,
                position: newPosition,
                type: PROCESS.replicate.id,
                title: this.nodeTitle,
            };

            const nodeId = await this.pipelineBoardService.addNode(addNodeService);
            if (nodeId) {
                const newNodeComponent: PipelineNodeModel = {
                    id: nodeId,
                    title: this.nodeTitle,
                    processesInfoType: PROCESS.replicate.id,
                    position: newPosition,
                    openedSettingModal: false,
                    afterId: nodeDestinationId,
                    beforeId: this.nodeData.beforeId,
                    leaderlines: [],
                };
                this.replicateNodeEmit.emit(newNodeComponent);
                console.log(`add new node with ${newNodeComponent.id} id`);
            }
        }

        console.log('saaaaaaaaaaalam');
        // console.log(`delete node ${this.nodeRemoveInfo.nodeId}`);
    }
}
