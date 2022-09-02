import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-empty',
    templateUrl: './empty.component.html',
    styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent {
    @Input() public texts: string[] = [];
}
