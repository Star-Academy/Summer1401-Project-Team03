import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {PipelineBoardService} from '../../../../services/pipeline-board.service';
import {ItemType} from '../../../../enums/ItemType.enum';
import {PROCESS} from '../../../../data/Processes.data';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
    @Input() public config: string | null = null;

    public processes = PROCESS;
    public configTypes = ItemType;

    public configs: any | null = null;

    public constructor(public boardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.boardService.selectedNodeConfigRx.subscribe((value: any | null) => (this.configs = value));
    }

    public ngOnDestroy(): void {
        this.boardService.selectedNodeConfigRx.unsubscribe();
    }
}
