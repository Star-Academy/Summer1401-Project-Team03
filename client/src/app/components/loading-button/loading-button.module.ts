import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingButtonComponent} from './loading-button.component';
import {ButtonModule} from '../button/button.module';

@NgModule({
    declarations: [LoadingButtonComponent],
    exports: [LoadingButtonComponent],
    imports: [CommonModule, ButtonModule],
})
export class LoadingButtonModule {}
