import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataListModule} from './components/data-list/data-list.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, DataListModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
