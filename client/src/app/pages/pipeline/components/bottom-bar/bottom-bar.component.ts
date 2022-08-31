import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableColumn} from '../../../../components/data-table/models/table-column.model';
import {IoType} from './enums/io-type.enum';
import {DatalistOption} from '../../../../models/DatalistOption.interface';
import {sampleColumns, sampleRows} from '../../../../data/fake-data/table-sample-data.data';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent {
    @Input() public processId?: string;
    @Input() public processTitle!: string;

    @Input() public inputColumns: TableColumn[] | null = sampleColumns;
    @Input() public inputRows: string[][] | null = sampleRows;

    @Input() public outputColumns: TableColumn[] | null = sampleColumns;
    @Input() public outputRows: string[][] | null = sampleRows;

    @Input() public whichSide: IoType = IoType.BOTH;
    @Output() public whichSideChange = new EventEmitter<IoType>();

    public get ioTypeValues(): DatalistOption[] {
        return Object.entries(IoType).map(([value, title]) => ({title, value}));
    }

    public set whichSideSet(newValue: string) {
        switch (newValue) {
            case 'INPUT':
                this.whichSide = IoType.INPUT;
                break;
            case 'OUTPUT':
                this.whichSide = IoType.OUTPUT;
                break;
            case 'BOTH':
                this.whichSide = IoType.BOTH;
                break;
            default:
                throw new Error(newValue);
        }
        console.log(this.whichSide.toLowerCase());
    }
}
