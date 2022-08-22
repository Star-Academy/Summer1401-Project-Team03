import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {NavbarItemComponent} from './components/navbar-item/navbar-item.component';
import {SvgModule} from '../svg/svg.module';

@NgModule({
    declarations: [NavbarComponent, NavbarItemComponent, NavbarItemComponent],
    imports: [CommonModule, SvgModule],
    exports: [NavbarComponent],
})
export class NavbarModule {}
