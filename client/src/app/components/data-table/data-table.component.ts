import {Component, Input} from '@angular/core';
import {TableColumn} from './models/table-column.model';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
    @Input() public title!: string;

    @Input() public columns!: TableColumn[];
    @Input() public rows!: string[][];

    public get rowCount(): number {
        return this.rows.length;
    }
}
