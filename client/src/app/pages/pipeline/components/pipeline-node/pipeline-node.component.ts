import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';

@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent {
    @Input() public pipelineNodeData!: PipelineNodeModel;
    @Output() public removeNodeEmit = new EventEmitter<void>();
    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();

    public toggleShowItemSettingModal(): void {
        this.pipelineNodeData.openedSettingModal = !this.pipelineNodeData.openedSettingModal;
    }

    public configNode(id: string): void {
        this.pipelineNodeData.openedSettingModal = false;
        console.log(`configure node ${id}`);
        // TODO Connect to service
    }
}
