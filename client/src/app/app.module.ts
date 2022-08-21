import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ModalModule} from './components/modal/modal.module';
import {NavbarModule} from './components/navbar/navbar.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, DashboardModule, NavbarModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
