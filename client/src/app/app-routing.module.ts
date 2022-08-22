import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PipelineBoardComponent} from './pages/pipeline-board/pipeline-board.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'pipeline-board',
        component: PipelineBoardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
