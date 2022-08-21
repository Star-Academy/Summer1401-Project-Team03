import {Component} from '@angular/core';
import {DatalistOption} from './models/DatalistOption.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public options: DatalistOption[] = [
        {
            title: 'salam',
            value: 'hi',
        },
        {
            title: 'khodafez',
            value: 'bye',
        },
    ];

    public value: string = '';
}
