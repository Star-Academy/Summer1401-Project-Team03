import {Component} from '@angular/core';
import {SpinnerService} from '../../services/spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
    public constructor(public spinnerService: SpinnerService) {
        spinnerService.component = this;
    }
}
