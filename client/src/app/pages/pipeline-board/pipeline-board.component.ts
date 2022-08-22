import {Component, OnInit} from '@angular/core';
import {NgxDraggabillyOptions} from 'ngx-draggabilly';

@Component({
    selector: 'app-pipeline-board',
    templateUrl: './pipeline-board.component.html',
    styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent {
    public draggabillyOptions: NgxDraggabillyOptions = {
        containment: true,
    };
}
