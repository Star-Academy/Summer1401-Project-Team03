import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../../../components/modal/modal.component';
import {PipelineNodeModel} from '../../../../../../models/pipeline-node.model';

@Component({
    selector: 'app-remove-node',
    templateUrl: './remove-node.component.html',
    styleUrls: ['./remove-node.component.scss'],
})
export class RemoveNodeComponent {
    @ViewChild('removeNodeModal') public modal!: ModalComponent;
    @Input() public nodeData!: PipelineNodeModel;
    @Output() public removeNodeEmit = new EventEmitter<void>();

    public openModal(): void {
        this.modal.openModal();
    }

    public removeNodeHandle(id: string): void {
        this.modal.closeModal();
        this.nodeData.openedSettingModal = false;
        console.log(`delete node ${id}`);
        // TODO Connect to service
    }
}
