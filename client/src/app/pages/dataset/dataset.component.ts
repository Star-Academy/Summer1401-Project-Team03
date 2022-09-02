import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InventoryService} from '../../services/inventory.service';
import {TableColumn} from '../../components/data-table/models/table-column.model';

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss'],
})
export class DatasetComponent implements OnInit {
    @Input() public datasetId!: number;

    public datasetTitle!: string;
    public datasetCategory!: string;

    public columns: TableColumn[] = [];
    public cells: string[][] = [];

    public newName = '';
    public titleEdit = false;

    public constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}

    public ngOnInit(): void {
        this.route.params.subscribe(async ({id}) => {
            this.datasetId = id;

            await this.inventoryService.getAllDataset();

            const dataset = this.inventoryService.dataset.find(({id}) => id === this.datasetId)!;
            this.datasetTitle = dataset.name;

            const dataSample = await this.inventoryService.getSample(this.datasetId);
            if (dataSample) {
                this.columns = dataSample.first;
                this.cells = dataSample.second;
            }
        });
    }

    public async renameDataset(): Promise<void> {
        if (
            await this.inventoryService.renameDataset({
                fileId: this.datasetId,
                newName: this.newName,
                category: this.datasetCategory,
            })
        ) {
            this.titleEdit = false;
            this.datasetTitle = this.newName;
        }
    }
}
