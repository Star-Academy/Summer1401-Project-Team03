import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {ModalModule} from 'src/app/components/modal/modal.module';
import {ImportButtonComponent} from './components/import-button/import-button.component';

@NgModule({
    declarations: [DashboardComponent, ImportButtonComponent],
    imports: [CommonModule, RouterModule, ModalModule],
})
export class DashboardModule {}
