import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo, ProcessSchema} from 'src/app/data/Processes.data';
import {customProcessType, ProcessType} from 'src/app/enums/ProcessType.enum';
import {AddNodeServiceModel, NodeAddInfoModel, PipelineNodeModel} from '../../../../../../models/pipeline-node.model';
import {PipelineBoardService} from '../../../../../../services/pipeline-board.service';
import {AddNodeReplicateComponent} from './components/add-node-replicate/add-node-replicate.component';

let counter = 10;
const ADDITIONAL_LEFT = 300;
const ADDITIONAL_BOTTOM = 160;

@Component({
    selector: 'app-add-node',
    templateUrl: './add-node.component.html',
    styleUrls: ['./add-node.component.scss'],
})
export class addNodeComponent implements OnInit {
    @ViewChild('ProcessAdd') public modal!: ModalComponent;
    @ViewChild('replicateModal') public replicateModal!: AddNodeReplicateComponent;

    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();
    public nodeData!: NodeAddInfoModel;
    public pipelineBoardId!: number;
    public nodeTitle: string = 'new node';
    public customProcessType: {[key in string]: ProcessSchema} = {};

    public selectedTypeId!: number;

    public constructor(private pipelineBoardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.customProcessType = this.customProcessTypeFunction();
    }

    private customProcessTypeFunction(): any {
        return Object.entries(PROCESS)
            .filter(([key, value]) => Object.values(customProcessType).includes((<any>customProcessType)[key]))
            .reduce((prev, curr) => ({...prev, [curr[0]]: curr[1]}), {});
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

    public async addNodeHandle(): Promise<void> {
        this.modal.closeModal();

        const title = this.nodeTitle;
        let newPosition = {x: this.nodeData.position.x + ADDITIONAL_LEFT, y: this.nodeData.position.y};

        if (this.selectedTypeId === PROCESS.replicate.id) {
            this.replicateModal.openModal(this.pipelineBoardId, this.nodeData, title);
            this.selectedTypeId = -1;
            this.nodeTitle = 'new node';
            return undefined;
        }

        // // TODO Connect to service

        console.log(this.pipelineBoardId);
        const addNodeService: AddNodeServiceModel = {
            pipelineID: this.pipelineBoardId,
            previousComponentId: this.nodeData.beforeId,
            nextComponentId: this.nodeData.afterId,
            position: newPosition,
            type: this.selectedTypeId,
            title,
        };

        const nodeId = await this.pipelineBoardService.addNode(addNodeService);
        if (nodeId) {
            const newNodeComponent: PipelineNodeModel = {
                id: nodeId,
                title,
                processesInfoType: this.selectedTypeId,
                position: newPosition,
                openedSettingModal: false,
                afterId: this.nodeData.afterId,
                beforeId: this.nodeData.beforeId,
                leaderlines: [],
            };
            this.addNodeEmit.emit(newNodeComponent);
            console.log(`add new node with ${newNodeComponent.id} id`);
        }

        this.selectedTypeId = -1;
        this.nodeTitle = 'new node';
    }

    public addNodeReplicateHandle(nodeInfo: PipelineNodeModel): void {
        console.log(nodeInfo.processesInfoType);
        this.addNodeEmit.emit(nodeInfo);
    }
}
