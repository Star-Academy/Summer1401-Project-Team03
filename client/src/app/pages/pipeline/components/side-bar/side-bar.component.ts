import {Component, OnInit, OnDestroy} from '@angular/core';
import {PipelineBoardService} from '../../../../services/pipeline-board.service';
import {ItemType} from '../../../../enums/ItemType.enum';
import {PROCESS} from '../../../../data/Processes.data';
import {ProcessType} from 'src/app/enums/ProcessType.enum';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
    public configs: any | null = null;

    public constructor(public boardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.boardService.selectedNodeConfigRx.subscribe((value: any | null) => {
            if (!value || !this.boardService.selectedNode) {
                this.configs = null;
                return;
            }

            this.configs = PROCESS[this.boardService.selectedNode.type];
        });
    }

    public ngOnDestroy(): void {
        this.boardService.selectedNodeConfigRx.unsubscribe();
    }
}
