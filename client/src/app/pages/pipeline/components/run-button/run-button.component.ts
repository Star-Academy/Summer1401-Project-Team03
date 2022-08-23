import {Component, Input} from '@angular/core';
import {RunStep} from './enums/run-step.enum';

@Component({
    selector: 'app-run-button',
    templateUrl: './run-button.component.html',
    styleUrls: ['./run-button.component.scss'],
})
export class RunButtonComponent {
    @Input() public runStep = RunStep.NOT_STARTED;

    public RunStep = RunStep;

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

    public runClickHandler(): void {
        this.runStep += 1;
    }
}
