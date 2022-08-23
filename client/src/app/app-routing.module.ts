import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PipelineBoardComponent} from './pages/pipeline-board/pipeline-board.component';
import {PipelineInventoryComponent} from './pages/pipeline-inventory/pipeline-inventory.component';
import {DatasetInventoryComponent} from './pages/dataset-inventory/dataset-inventory.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dataset-inventory'},
    {
        path: 'pipeline-inventory',
        component: PipelineInventoryComponent,
    },
    {
        path: 'dataset-inventory',
        component: DatasetInventoryComponent,
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
