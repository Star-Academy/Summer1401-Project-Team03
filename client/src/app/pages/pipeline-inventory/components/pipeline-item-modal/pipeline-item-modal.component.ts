import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-pipeline-item-modal',
    templateUrl: './pipeline-item-modal.component.html',
    styleUrls: ['./pipeline-item-modal.component.scss'],
})
export class PipelineItemModalComponent {
    @Output() public renameEmit = new EventEmitter<void>();
    @Output() public deleteEmit = new EventEmitter<void>();
}
