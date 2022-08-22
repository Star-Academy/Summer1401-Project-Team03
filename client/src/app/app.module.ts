import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarModule} from './components/navbar/navbar.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import { BoardComponent } from './pages/pipeline-board/components/board/board/board.component';

@NgModule({
    declarations: [AppComponent, BoardComponent],
    imports: [BrowserModule, AppRoutingModule, DashboardModule, NavbarModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
