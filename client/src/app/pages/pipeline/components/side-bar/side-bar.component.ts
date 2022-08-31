import {Component, OnInit, OnDestroy} from '@angular/core';
import {PipelineBoardService} from '../../../../services/pipeline-board.service';
import {ItemType} from '../../../../enums/ItemType.enum';
import {PROCESS} from '../../../../data/Processes.data';
import {ProcessType} from 'src/app/enums/ProcessType.enum';
import {Paramether} from 'src/app/models/Parameter.interface';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
    public itemTypes = ItemType;
    public configs: {[key in string]: Paramether} | null = null;

    public constructor(public boardService: PipelineBoardService) {}

    public ngOnInit(): void {
        this.boardService.selectedNodeConfigRx.subscribe((value: any | null) => {
            console.log('called');
            if (!value || !this.boardService.selectedNode) {
                this.configs = null;
                return;
            }

            const process: ProcessType = (<any>ProcessType)[this.boardService.selectedNode.processesInfoType];

            const typeConfigs = PROCESS[process].paramethers;
            this.configs = Object.keys(typeConfigs).reduce(
                (prev, param) => ({
                    ...prev,
                    [param]: {
                        ...typeConfigs[param],
                        value: value[param]?.[0] || typeConfigs[param].value,
                    },
                }),
                {}
            );

            console.log('setting', this.configs);
        });
    }

    public ngOnDestroy(): void {
        this.boardService.selectedNodeConfigRx.unsubscribe();
    }
}
