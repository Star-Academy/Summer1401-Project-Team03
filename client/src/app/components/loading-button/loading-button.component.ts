import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
    @Input() public loading!: boolean;
    @Input() public text!: string;
}
