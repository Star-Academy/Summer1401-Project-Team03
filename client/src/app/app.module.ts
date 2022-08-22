import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarModule} from './components/navbar/navbar.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {PipelineInventoryModule} from './pages/pipeline-inventory/pipeline-inventory.module';
import {DatasetInventoryModule} from './pages/dataset-inventory/dataset-inventory.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        NavbarModule,
        PipelineInventoryModule,
        DatasetInventoryModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
