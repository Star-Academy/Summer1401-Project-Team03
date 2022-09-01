import {Component} from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    public get isShrink(): boolean {
        const cached = localStorage.getItem('navbarIsShrink');
        return (cached || 'false') === 'true';
    }

    public set isShrink(newValue: boolean) {
        localStorage.setItem('navbarIsShrink', String(newValue));
    }
    public toggleShrink(): void {
        this.isShrink = !this.isShrink;
    }
}
