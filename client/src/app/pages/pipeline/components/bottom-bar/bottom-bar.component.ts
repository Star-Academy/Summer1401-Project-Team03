import {Component, Input} from '@angular/core';
import {TableColumn} from '../../../../components/data-table/models/table-column.model';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent {
    @Input() public inputColumns: TableColumn[] = [];
    @Input() public inputCells: string[][] = [];

    @Input() public outputColumns: TableColumn[] = [];
    @Input() public outputCells: string[][] = [];

    @Input() public whichSide: 'input' | 'output' | 'both' = 'both';
}
