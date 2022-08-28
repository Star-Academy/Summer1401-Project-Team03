import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../../../components/modal/modal.component';
import {NodeRemoveInfoModel} from '../../../../../../models/pipeline-node.model';

@Component({
    selector: 'app-remove-node',
    templateUrl: './remove-node.component.html',
    styleUrls: ['./remove-node.component.scss'],
})
export class RemoveNodeComponent {
    @ViewChild('removeNodeModal') public modal!: ModalComponent;
    @Output() public removeNodeEmit = new EventEmitter<NodeRemoveInfoModel>();
    public nodeRemoveInfo!: NodeRemoveInfoModel;

    public openModal(nodeId: string, beforeId: string, afterId: string): void {
        this.nodeRemoveInfo = {
            nodeId,
            beforeId,
            afterId,
        };
        this.modal.openModal();
    }

    public removeNodeHandle(): void {
        this.modal.closeModal();

        this.removeNodeEmit.emit(this.nodeRemoveInfo);

        console.log(`delete node ${this.nodeRemoveInfo.nodeId}`);
        // TODO Connect to service
    }
}
