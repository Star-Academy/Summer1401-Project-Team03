import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() public type: string = 'button';
    @Input() public disabled: boolean = false;
    @Input() public styleType: 'default' | 'secondary' = 'default';
}
