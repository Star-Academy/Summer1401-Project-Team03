import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../../../components/modal/modal.component';
import {NodeRemoveInfoModel} from '../../../../../../models/pipeline-node.model';
import {PipelineBoardService} from '../../../../../../services/pipeline-board.service';

@Component({
    selector: 'app-remove-node',
    templateUrl: './remove-node.component.html',
    styleUrls: ['./remove-node.component.scss'],
})
export class RemoveNodeComponent {
    @ViewChild('removeNodeModal') public modal!: ModalComponent;
    @Output() public removeNodeEmit = new EventEmitter<NodeRemoveInfoModel>();
    public nodeRemoveInfo!: NodeRemoveInfoModel;
    public pipelineBoardId!: number;

    public constructor(private pipelineBoardService: PipelineBoardService) {}

    public openModal(nodeId: number, beforeId: number, afterId: number, pipelineBoardId: number): void {
        this.nodeRemoveInfo = {
            nodeId,
            beforeId,
            afterId,
        };
        this.pipelineBoardId = pipelineBoardId;
        this.modal.openModal();
    }

    public async removeNodeHandle(): Promise<void> {
        this.modal.closeModal();

        await this.pipelineBoardService.removeNode({
            pipelineID: this.pipelineBoardId,
            componentID: this.nodeRemoveInfo.nodeId,
        });
        // TODO check if remove from database, remove node in board

        this.removeNodeEmit.emit(this.nodeRemoveInfo);

        console.log(`delete node ${this.nodeRemoveInfo.nodeId}`);
    }
}
