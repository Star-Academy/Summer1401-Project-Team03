import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TextItem} from 'src/app/models/FormItems.interface';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() public data: TextItem = {
        label: '',
        value: '',
        type: 'text',
    };

    @Output() public valueChange = new EventEmitter<string>();
}
