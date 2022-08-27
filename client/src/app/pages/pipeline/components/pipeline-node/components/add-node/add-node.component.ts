import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo, ProcessSchema} from 'src/app/data/Processes.data';
import {PipelineNodeModel} from '../../../../../../models/pipeline-node.model';

let counter = 20;
const ADDITIONAL_LEFT = 220;
const ADDITIONAL_BOTTOM = 140;
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

    public addNodeHandle(perviousPipeline: PipelineNodeModel, type: ProcessSchema): void {
        this.modal.closeModal();
        this.nodeData.openedSettingModal = false;

        const title = this.nodeTitle;
        let newPosition;
        let newPipelines: PipelineNodeModel[] = [];
        let isReplicate = false;
        if (type.title === 'replicate') {
            newPosition = {x: perviousPipeline.position.x, y: perviousPipeline.position.y + ADDITIONAL_BOTTOM};
            newPipelines = [
                {
                    ...perviousPipeline,
                    id: '1001',
                    position: {x: perviousPipeline.position.x + ADDITIONAL_LEFT, y: perviousPipeline.position.y},
                },
            ];
            console.log('replicate!!');
            isReplicate = true;
        } else {
            newPosition = {x: perviousPipeline.position.x + ADDITIONAL_LEFT, y: perviousPipeline.position.y};
        }
        const newNodeComponent: PipelineNodeModel = {
            id: counter.toString(),
            title,
            processesInfoType: type,
            openedSettingModal: false,
            position: newPosition,
            pipelines: newPipelines,
            isReplicate,
            leaderLines: [],
        };
        counter++; // temporary
        this.addNodeEmit.emit(newNodeComponent);

        console.log(`add new node with ${newNodeComponent.id} id`);
        // // TODO Connect to service
    }
}
