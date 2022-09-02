import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PipelineInventoryComponent} from './pages/pipeline-inventory/pipeline-inventory.component';
import {DatasetInventoryComponent} from './pages/dataset-inventory/dataset-inventory.component';
import {PipelineComponent} from './pages/pipeline/pipeline.component';
import {DatasetComponent} from './pages/dataset/dataset.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dataset-inventory'},
    {path: 'pipeline-inventory', component: PipelineInventoryComponent},
    {path: 'dataset-inventory', component: DatasetInventoryComponent},
    {path: 'pipeline/:id', component: PipelineComponent},
    {path: 'dataset/:id', component: DatasetComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
