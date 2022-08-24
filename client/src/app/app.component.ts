import {Component, ViewChild} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('nameInput', {static: true}) nameInput: any;
    public shrinkedNavbar: boolean = false;
    public toggleShrink(): void {
        this.shrinkedNavbar = !this.shrinkedNavbar;
    }
}
