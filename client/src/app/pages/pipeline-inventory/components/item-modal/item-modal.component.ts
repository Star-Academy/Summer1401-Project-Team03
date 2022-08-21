import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-item-modal',
    templateUrl: './item-modal.component.html',
    styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent {
    @Output() public renameEmit = new EventEmitter<void>();
    @Output() public deleteEmit = new EventEmitter<void>();
}
