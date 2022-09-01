import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatalistOption} from '../../models/DatalistOption.interface';

@Component({
    selector: 'app-pill-menu-input',
    templateUrl: './pill-menu-input.component.html',
    styleUrls: ['./pill-menu-input.component.scss'],
})
export class PillMenuInputComponent {
    @Input() public label: string = '';
    @Input() public options: DatalistOption[] = [];
    @Input() public disabled: boolean = false;

    @Input() public value: string = '';
    @Output() public valueChange = new EventEmitter<string>();
}
