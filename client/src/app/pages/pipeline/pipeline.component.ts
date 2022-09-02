import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PipelineBoardService} from 'src/app/services/pipeline-board.service';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
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

    public constructor(private route: ActivatedRoute, public boardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.route.params.subscribe(async (params: Params) => {
            this.boardService.selectedPipelineBoardId = params.id;
            this.boardService.getAllNode();
        });
    }
}
