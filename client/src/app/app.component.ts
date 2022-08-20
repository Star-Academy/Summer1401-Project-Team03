import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public shrinkedNavbar: boolean = false;
    public shrinkNavbar(): void {
        this.shrinkedNavbar = !this.shrinkedNavbar;
    }
}
