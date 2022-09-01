import {Component} from '@angular/core';
import {SnackbarService} from '../../services/snackbar.service';
import {SnackbarObject} from './models/snackbar-object.model';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
    public constructor(public snackbarService: SnackbarService) {
        snackbarService.component = this;
    }

    public get snackbars(): SnackbarObject[] {
        return Object.values(this.snackbarService.snackbars);
    }
}
