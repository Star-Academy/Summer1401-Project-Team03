import {Component} from '@angular/core';
import {TableColumn} from './models/table-column.model';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
    public columns: Array<TableColumn> = [];
    public rows: Array<Array<string>> = [];
}
