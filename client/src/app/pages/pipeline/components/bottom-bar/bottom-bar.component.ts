import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableColumn} from '../../../../components/data-table/models/table-column.model';
import {IoType} from './enums/io-type.enum';
import {DatalistOption} from '../../../../models/DatalistOption.interface';

// noinspection JSUnusedLocalSymbols
const sampleColumns: TableColumn[] = [
    new TableColumn('title 0', 'Date', 'string'),
    new TableColumn('title 1', 'Date', 'string'),
    new TableColumn('title 2', 'Date', 'string'),
    new TableColumn('title 3', 'Date', 'string'),
    new TableColumn('title 4', 'Date', 'string'),
    new TableColumn('title 5', 'Date', 'string'),
    new TableColumn('title 6', 'Date', 'string'),
    new TableColumn('title 7', 'Date', 'string'),
    new TableColumn('title 8', 'Date', 'string'),
    new TableColumn('title 9', 'Date', 'string'),
    new TableColumn('title 10', 'Date', 'string'),
    new TableColumn('title 11', 'Date', 'string'),
];
// noinspection JSUnusedLocalSymbols
const sampleRows: string[][] = [
    [
        'hi 0 0',
        'hi 0 1',
        'hi 0 2',
        'hi 0 3',
        'hi 0 4',
        'hi 0 5',
        'hi 0 6',
        'hi 0 7',
        'hi 0 8',
        'hi 0 9',
        'hi 0 10',
        'hi 0 11',
    ],
    [
        'hi 1 0',
        'hi 1 1',
        'hi 1 2',
        'hi 1 3',
        'hi 1 4',
        'hi 1 5',
        'hi 1 6',
        'hi 1 7',
        'hi 1 8',
        'hi 1 9',
        'hi 1 10',
        'hi 1 11',
    ],
    [
        'hi 2 0',
        'hi 2 1',
        'hi 2 2',
        'hi 2 3',
        'hi 2 4',
        'hi 2 5',
        'hi 2 6',
        'hi 2 7',
        'hi 2 8',
        'hi 2 9',
        'hi 2 10',
        'hi 2 11',
    ],
    [
        'hi 3 0',
        'hi 3 1',
        'hi 3 2',
        'hi 3 3',
        'hi 3 4',
        'hi 3 5',
        'hi 3 6',
        'hi 3 7',
        'hi 3 8',
        'hi 3 9',
        'hi 3 10',
        'hi 3 11',
    ],
    [
        'hi 4 0',
        'hi 4 1',
        'hi 4 2',
        'hi 4 3',
        'hi 4 4',
        'hi 4 5',
        'hi 4 6',
        'hi 4 7',
        'hi 4 8',
        'hi 4 9',
        'hi 4 10',
        'hi 4 11',
    ],
    [
        'hi 5 0',
        'hi 5 1',
        'hi 5 2',
        'hi 5 3',
        'hi 5 4',
        'hi 5 5',
        'hi 5 6',
        'hi 5 7',
        'hi 5 8',
        'hi 5 9',
        'hi 5 10',
        'hi 5 11',
    ],
    [
        'hi 6 0',
        'hi 6 1',
        'hi 6 2',
        'hi 6 3',
        'hi 6 4',
        'hi 6 5',
        'hi 6 6',
        'hi 6 7',
        'hi 6 8',
        'hi 6 9',
        'hi 6 10',
        'hi 6 11',
    ],
];

// noinspection JSUnusedLocalSymbols
const smallSampleColumns: TableColumn[] = [
    new TableColumn('title 0', 'Date', 'string'),
    new TableColumn('title 1', 'Date', 'string'),
    new TableColumn('title 2', 'Date', 'string'),
    new TableColumn('title 3', 'Date', 'string'),
];
// noinspection JSUnusedLocalSymbols
const smallSampleRows: string[][] = [
    ['hi 0 0', 'hi 0 1', 'hi 0 2', 'hi 0 3'],
    ['hi 1 0', 'hi 1 1', 'hi 1 2', 'hi 1 3'],
    ['hi 2 0', 'hi 2 1', 'hi 2 2', 'hi 2 3'],
    ['hi 3 0', 'hi 3 1', 'hi 3 2', 'hi 3 3'],
    ['hi 4 0', 'hi 4 1', 'hi 4 2', 'hi 4 3'],
    ['hi 5 0', 'hi 5 1', 'hi 5 2', 'hi 5 3'],
    ['hi 6 0', 'hi 6 1', 'hi 6 2', 'hi 6 3'],
];

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
