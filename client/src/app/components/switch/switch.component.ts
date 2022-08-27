import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
    @Input() public label: string = '';
    @Input() public value: boolean = false;
    @Input() public disabled: boolean = false;
    @Output() public valueChange = new EventEmitter<boolean>();
}
