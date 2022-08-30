import {Component} from '@angular/core';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent {
    public get sideBarShown(): boolean {
        const cached = localStorage.getItem('sideBarShown');
        return (cached || 'true') === 'true';
    }

    public set sideBarShown(newValue: boolean) {
        localStorage.setItem('sideBarShown', String(newValue));
    }

    public get bottomBarShown(): boolean {
        const cached = localStorage.getItem('bottomBarShown');
        return (cached || 'true') === 'true';
    }

    public set bottomBarShown(newValue: boolean) {
        localStorage.setItem('bottomBarShown', String(newValue));
    }
}
