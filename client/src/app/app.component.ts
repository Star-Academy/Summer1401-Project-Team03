import {Component} from '@angular/core';
import {DatalistOption} from './models/DatalistOption.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public shrinkedNavbar: boolean = false;
    public toggleShrink(): void {
        this.shrinkedNavbar = !this.shrinkedNavbar;
    }
}
