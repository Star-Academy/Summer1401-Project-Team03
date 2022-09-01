import {Component, OnInit, OnDestroy} from '@angular/core';
import {PipelineBoardService} from '../../../../services/pipeline-board.service';
import {ItemType} from '../../../../enums/ItemType.enum';
import {PROCESS} from '../../../../data/Processes.data';
import {ProcessType} from 'src/app/enums/ProcessType.enum';
import {Paramether} from '../../../../models/Parameter.interface';

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
            console.log(value);

            if (!value) {
                this.configs = null;
                return;
            }

            this.setupConfigs(value);
        });
    }

    public ngOnDestroy(): void {
        this.boardService.selectedNodeConfigRx.unsubscribe();
    }

    private setupConfigs(value: any): void {
        const process: number = this.boardService.selectedNode!.processesInfoType;

        const typeConfigs = this.boardService.convertIdToType(process).parameters;

        if (!Object.keys(typeConfigs).length) {
            this.configs = null;
            return;
        }

        this.configs = Object.keys(typeConfigs).reduce((prev, param) => {
            const result = value[param]
                ? typeConfigs[param].type === ItemType.TEXT_INPUT
                    ? value[param].join(', ')
                    : value[param][0]
                : typeConfigs[param].value;
            return {
                ...prev,
                [param]: {
                    ...typeConfigs[param],
                    value: result,
                },
            };
        }, {});
    }
}
