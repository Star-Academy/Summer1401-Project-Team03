import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PipelineBoardService} from 'src/app/services/pipeline-board.service';
import {PipelineService} from 'src/app/services/pipeline.service';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
    public sideBarShown: boolean = true;
    public bottomBarShown: boolean = true;

    public constructor(private route: ActivatedRoute, private boardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.route.params.subscribe(async (params: Params) => {
            this.boardService.selectedPipelineBoardId = params.id;
            this.boardService.getAllNode();
        });
    }
}
