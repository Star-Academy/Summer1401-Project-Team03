import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {InventoryService} from '../../services/inventory.service';
import {TableColumn} from '../../components/data-table/models/table-column.model';

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss'],
})
export class DatasetComponent implements OnInit {
    @Input() public datasetId!: number;

    public columns: TableColumn[] = [];
    public cells: string[][] = [];

    public constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}

    public ngOnInit(): void {
        this.route.params.subscribe(async ({id}) => {
            this.datasetId = id;
            this.columns;
        });
    }
}
