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
    @Input() public url: string = '';
    @Input() public isShrink: boolean = false;

    public constructor(private router: Router) {}

    public get isCurrentPage(): boolean {
        return this.router.url === `/${this.url}`;
    }

    public async navigateUrl(): Promise<void> {
        await this.router.navigate([`/${this.url}`]);
    }
}
