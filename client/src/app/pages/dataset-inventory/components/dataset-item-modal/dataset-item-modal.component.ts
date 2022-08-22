import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-dataset-item-modal',
    templateUrl: './dataset-item-modal.component.html',
    styleUrls: ['./dataset-item-modal.component.scss'],
})
export class DatasetItemModalComponent {
    @Output() public renameEmit = new EventEmitter<void>();
    @Output() public downloadEmit = new EventEmitter<void>();
    @Output() public deleteEmit = new EventEmitter<void>();
}
