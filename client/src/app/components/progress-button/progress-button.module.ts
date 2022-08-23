import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressButtonComponent} from './progress-button.component';
import {ButtonModule} from '../button/button.module';

@NgModule({
    declarations: [ProgressButtonComponent],
    exports: [ProgressButtonComponent],
    imports: [CommonModule, ButtonModule],
})
export class ProgressButtonModule {}
