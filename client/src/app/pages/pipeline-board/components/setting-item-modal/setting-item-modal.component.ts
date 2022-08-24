import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-setting-item-modal',
    templateUrl: './setting-item-modal.component.html',
    styleUrls: ['./setting-item-modal.component.scss'],
})
export class SettingItemModalComponent {
    @Output() public renameEmit = new EventEmitter<void>();
    @Output() public downloadEmit = new EventEmitter<void>();
    @Output() public deleteEmit = new EventEmitter<void>();
}
