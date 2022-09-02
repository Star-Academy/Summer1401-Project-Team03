import {Component} from '@angular/core';
import {SpinnerService} from 'src/app/services/spinner.service';
import {SnackbarService} from '../../services/snackbar.service';

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
