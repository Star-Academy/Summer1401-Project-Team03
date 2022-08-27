import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatalistOption} from 'src/app/models/DatalistOption.interface';

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent {
    @Input() public label: string = '';
    @Input() public options: DatalistOption[] = [];
    @Input() public disabled: boolean = false;

    @Input() public value: string = '';
    @Output() public valueChange = new EventEmitter<string>();
}
