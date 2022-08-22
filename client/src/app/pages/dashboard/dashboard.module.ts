import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {SwitchModule} from 'src/app/components/switch/switch.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, RouterModule, SwitchModule],
})
export class DashboardModule {}
