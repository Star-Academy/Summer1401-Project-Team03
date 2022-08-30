import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarModule} from './components/navbar/navbar.module';
import {PipelineModule} from './pages/pipeline/pipeline.module';
import {PipelineInventoryModule} from './pages/pipeline-inventory/pipeline-inventory.module';
import {DatasetInventoryModule} from './pages/dataset-inventory/dataset-inventory.module';
import {DataTableModule} from './components/data-table/data-table.module';
import {AngularDraggableModule} from 'angular2-draggable';
import {NgxDraggabillyModule} from 'ngx-draggabilly';
import {SpinnerModule} from './components/spinner/spinner.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavbarModule,
        PipelineModule,
        PipelineInventoryModule,
        DatasetInventoryModule,
        DataTableModule,
        AngularDraggableModule,
        NgxDraggabillyModule,
        SpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
