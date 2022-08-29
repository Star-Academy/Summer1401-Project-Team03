import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo, ProcessSchema} from 'src/app/data/Processes.data';
import {customProcessType, ProcessType} from 'src/app/enums/ProcessType.enum';
import {AddNodeServiceModel, NodeAddInfoModel, PipelineNodeModel} from '../../../../../../models/pipeline-node.model';
import {PipelineBoardService} from '../../../../../../services/pipeline-board.service';

let counter = 10;
const ADDITIONAL_LEFT = 300;

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
    public nodeTitle: string = 'new node';

    public constructor(private pipelineBoardService: PipelineBoardService) {}

    public customProcessType(): customProcessType[] {
        const keys = Object.keys(customProcessType);
        return keys.map((type) => type as customProcessType);
    }

    public openModal(beforeId: number, afterId: number, position: {x: number; y: number}): void {
        this.nodeData = {
            beforeId,
            afterId,
            position,
        };

        this.modal.openModal();
    }

    public async addNodeHandle(type: customProcessType): Promise<void> {
        this.modal.closeModal();

        const title = this.nodeTitle;
        const newPosition = {x: this.nodeData.position.x + ADDITIONAL_LEFT, y: this.nodeData.position.y};

        // // TODO Connect to service

        const addNodeService: AddNodeServiceModel = {
            beforeId: this.nodeData.beforeId,
            afterId: this.nodeData.afterId,
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
            counter++; // temporary
            this.addNodeEmit.emit(newNodeComponent);
            console.log(`add new node with ${newNodeComponent.id} id`);
        }
    }
}
