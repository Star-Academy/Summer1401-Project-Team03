import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar-item',
    templateUrl: './navbar-item.component.html',
    styleUrls: ['./navbar-item.component.scss'],
})
export class NavbarItemComponent {
    @Input() public iconType: string = '';
    @Input() public title: string = '';

    public constructor(private router: Router) {}

    public async navigateUrl(): Promise<void> {
        await this.router.navigate([`/${this.title}`]);
    }
}
