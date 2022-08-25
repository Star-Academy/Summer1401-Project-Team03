import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {PROCESS} from '../../../../data/Processes.data';
import {ModalComponent} from '../../../../components/modal/modal.component';

const DUMMY_PIPELINE_NODE: PipelineNodeModel = {
    id: '8',
    title: 'new node',
    processesInfoType: PROCESS.FILTER,
    position: {x: 700, y: 100},
    openedSettingModal: false,
};
let counter = 10;
@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent {
    @Input() public pipelineNodeData!: PipelineNodeModel;
    @Output() public removeNodeEmit = new EventEmitter<void>();
    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();
    @ViewChild('mymodal') public modal!: ModalComponent;

    public toggleShowItemSettingModal(): void {
        this.pipelineNodeData.openedSettingModal = !this.pipelineNodeData.openedSettingModal;
    }

    public newNode(position: {x: number; y: number}): void {
        this.pipelineNodeData.openedSettingModal = false;

        const newPosition = {x: position.x + 200, y: position.y};

        const newNodeComponent: PipelineNodeModel = {
            ...DUMMY_PIPELINE_NODE,
            position: newPosition,
            id: counter.toString(),
        };
        counter++; // temporary
        this.addNodeEmit.emit(newNodeComponent);

        console.log(`add new node with ${newNodeComponent.id} id`);
        // TODO Connect to service
    }

    public configNode(id: string): void {
        this.pipelineNodeData.openedSettingModal = false;
        console.log(`configure node ${id}`);
        // TODO Connect to service
    }

    public deleteNode(id: string): void {
        this.pipelineNodeData.openedSettingModal = false;
        console.log(`delete node ${id}`);
        // TODO Connect to service
    }
}
