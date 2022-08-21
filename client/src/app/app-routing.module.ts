import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PipelineInventoryComponent} from './pages/pipeline-inventory/pipeline-inventory.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'pipeline-inventory',
        component: PipelineInventoryComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
