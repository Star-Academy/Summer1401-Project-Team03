import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarModule} from './components/navbar/navbar.module';
import {PipelineInventoryModule} from './pages/pipeline-inventory/pipeline-inventory.module';
import {DatasetInventoryModule} from './pages/dataset-inventory/dataset-inventory.module';
import {PipelineModule} from './pages/pipeline/pipeline.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavbarModule,
        PipelineInventoryModule,
        DatasetInventoryModule,
        PipelineModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
