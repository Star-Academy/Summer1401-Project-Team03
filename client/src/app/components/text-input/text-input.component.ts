import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() public label: string = '';
    @Input() public type: string = '';
    @Input() public value: string = '';
    @Output() public valueChange = new EventEmitter<string>();
}
