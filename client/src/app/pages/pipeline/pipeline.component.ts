import {Component} from '@angular/core';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent {
    public sideBarShown: boolean = true;
    public bottomBarShown: boolean = true;
}
