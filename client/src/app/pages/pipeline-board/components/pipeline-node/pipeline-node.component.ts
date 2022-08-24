import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {ModalComponent} from '../../../../components/modal/modal.component';

@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent {
    @Input() public pipelineNodeData!: PipelineNodeModel;
    @Output() public closeButtonEmit = new EventEmitter<void>();
    @Output() public renameEmit = new EventEmitter<void>();
    @Output() public downloadEmit = new EventEmitter<void>();
    @Output() public deleteEmit = new EventEmitter<void>();

    @ViewChild('mymodal') public modal!: ModalComponent;

    public toggleShowItemSettingModal(): void {
        this.pipelineNodeData.openedSettingModal = !this.pipelineNodeData.openedSettingModal;
    }

    public deleteItem(id: string): void {}

    public renameItem(id: string): void {}

    public downloadItem(id: string): void {}
}
