import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo, ProcessSchema} from 'src/app/data/Processes.data';
import {customProcessType, ProcessType} from 'src/app/enums/ProcessType.enum';
import {NodeAddInfoModel, PipelineNodeModel} from '../../../../../../models/pipeline-node.model';

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

    public customProcessType(): customProcessType[] {
        const keys = Object.keys(customProcessType);
        return keys.map((type) => type as customProcessType);
    }

    public openModal(beforeId: string, afterId: string, position: {x: number; y: number}): void {
        this.nodeData = {
            beforeId,
            afterId,
            position,
        };

        this.modal.openModal();
    }

    public addNodeHandle(type: customProcessType): void {
        this.modal.closeModal();

        const title = this.nodeTitle;
        const newPosition = {x: this.nodeData.position.x + ADDITIONAL_LEFT, y: this.nodeData.position.y};

        const newNodeComponent: PipelineNodeModel = {
            id: counter.toString(),
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
        // // TODO Connect to service
    }
}
