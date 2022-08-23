import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SwitchItem} from 'src/app/models/FormItems.interface';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
    @Input() public data: SwitchItem = {
        label: '',
        value: false,
    };

    @Output() public valueChange = new EventEmitter<boolean>();
}
