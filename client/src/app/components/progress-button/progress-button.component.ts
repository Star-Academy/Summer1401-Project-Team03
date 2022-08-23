import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-progress-button',
    templateUrl: './progress-button.component.html',
    styleUrls: ['./progress-button.component.scss'],
})
export class ProgressButtonComponent {
    @Input() public loading!: boolean;
    @Input() public text!: string;
}
