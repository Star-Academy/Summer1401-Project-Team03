import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-setting-item-modal',
    templateUrl: './setting-item-modal.component.html',
    styleUrls: ['./setting-item-modal.component.scss'],
})
export class SettingItemModalComponent {
    @Output() public newNodeEmit = new EventEmitter<void>();
    @Output() public configNodeEmit = new EventEmitter<void>();
    @Output() public deleteNodeEmit = new EventEmitter<void>();
}
