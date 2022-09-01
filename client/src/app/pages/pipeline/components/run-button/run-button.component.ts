import {Component, Input} from '@angular/core';
import {PipelineBoardService} from 'src/app/services/pipeline-board.service';
import {RunStep} from './enums/run-step.enum';
import {SnackbarService} from '../../../../services/snackbar.service';
import {SnackbarObject} from '../../../../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../../../../components/snackbar/enums/snackbar-theme';

@Component({
    selector: 'app-run-button',
    templateUrl: './run-button.component.html',
    styleUrls: ['./run-button.component.scss'],
})
export class RunButtonComponent {
    @Input() public runStep = RunStep.NOT_STARTED;

    public RunStep = RunStep;

    public constructor(private boardService: PipelineBoardService, private snackbarService: SnackbarService) {}

    public get text(): string {
        switch (this.runStep) {
            case RunStep.NOT_STARTED:
                return 'Run';
            case RunStep.PROCESSING:
                return 'Processing';
            case RunStep.RUNNING:
                return 'Stop';
        }
    }

    public async runClickHandler(): Promise<void> {
        this.runStep = RunStep.PROCESSING;
        const result = await this.boardService.runPipeline();
        if (result) {
            this.snackbarService.showNewId(
                new SnackbarObject(
                    `Pipeline "${this.boardService.selectedPipelineBoardTitle}" run successfully`,
                    SnackbarTheme.SUCCESS
                )
            );
        }
        this.runStep = RunStep.NOT_STARTED;
    }
}
