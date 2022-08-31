import {Component} from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    public isShrink: boolean = false;

    public toggleShrink(): void {
        this.isShrink = !this.isShrink;
    }
}
