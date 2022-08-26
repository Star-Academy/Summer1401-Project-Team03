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

    public addNodeHandle(position: {x: number; y: number}, type: ProcessSchema): void {
        this.modal.closeModal();
        this.nodeData.openedSettingModal = false;

        const title = this.nodeTitle;
        const newPosition = {x: position.x + ADDITIONAL_LEFT, y: position.y};

        const newNodeComponent: PipelineNodeModel = {
            id: counter.toString(),
            title,
            processesInfoType: type,
            position: newPosition,
            openedSettingModal: false,
            leaderLines: [],
        };
        counter++; // temporary
        this.addNodeEmit.emit(newNodeComponent);

        console.log(`add new node with ${newNodeComponent.id} id`);
        // // TODO Connect to service
    }
}
