import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackbarComponent} from './snackbar.component';

@NgModule({
    declarations: [SnackbarComponent],
    exports: [SnackbarComponent],
    imports: [CommonModule],
})
export class SnackbarModule {}
