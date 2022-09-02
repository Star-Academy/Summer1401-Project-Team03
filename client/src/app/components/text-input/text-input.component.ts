import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() public label: string = '';
    @Input() public type: string = 'text';
    @Input() public value: string = '';
    @Input() public disabled: boolean = false;
    @Output() public valueChange = new EventEmitter<string>();

    @Output() public confirm = new EventEmitter<void>();
    @Output() public cancel = new EventEmitter<void>();
}
