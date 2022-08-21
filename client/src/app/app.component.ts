import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from './components/modal/modal.component';

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
