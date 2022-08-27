import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo, ProcessSchema} from 'src/app/data/Processes.data';
import {PipelineNodeModel} from '../../../../../../models/pipeline-node.model';

let counter = 10;
const ADDITIONAL_LEFT = 220;

@Component({
    selector: 'app-add-node',
    templateUrl: './add-node.component.html',
    styleUrls: ['./add-node.component.scss'],
})
export class addNodeComponent {
    public processes: ProcessInfo = PROCESS;

    @ViewChild('ProcessAdd') public modal!: ModalComponent;
    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();
    @Input() public nodeData!: PipelineNodeModel;
    public nodeTitle: string = 'new node';

    public openModal(): void {
        this.modal.openModal();
    }

    public addNodeHandle(node: PipelineNodeModel, type: ProcessSchema): void {
        this.modal.closeModal();
        this.nodeData.openedSettingModal = false;

        const title = this.nodeTitle;
        const newPosition = {x: node.position.x + ADDITIONAL_LEFT, y: node.position.y};

        const newNodeComponent: PipelineNodeModel = {
            id: counter.toString(),
            title,
            processesInfoType: type,
            position: newPosition,
            openedSettingModal: false,
            afterId: node.afterId,
            beforeId: node.id,
        };
        counter++; // temporary
        this.addNodeEmit.emit(newNodeComponent);

        console.log(`add new node with ${newNodeComponent.id} id`);
        // // TODO Connect to service
    }
}
