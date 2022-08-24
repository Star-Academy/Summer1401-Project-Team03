import {Component, OnInit} from '@angular/core';
import {datasetItemData, DatasetItemModel} from '../../models/dataset/dataset-item.model';

@Component({
    selector: 'app-dataset.svg-inventory',
    templateUrl: './dataset-inventory.component.html',
    styleUrls: ['./dataset-inventory.component.scss'],
})
export class DatasetInventoryComponent {
    public searchPhrase: string = '';
    public datasetItems: DatasetItemModel[] = datasetItemData;

    public openItemSettingModal(id: number): void {
        const item = this.datasetItems.find((item) => item.id === id);
        if (item) item.openedSettingModal = true;
    }

    public closeItemSettingModal(id: number): void {
        const item = this.datasetItems.find((item) => item.id === id);
        if (item) item.openedSettingModal = false;
    }

    public renameItem(id: number): void {
        console.log(`Renamed item ${id}`);
        // Connect to inventory service
    }

    public downloadItem(id: number): void {
        console.log(`Downloaded item ${id}`);
        // Connect to inventory service
    }

    public deleteItem(id: number): void {
        console.log(`Removed item ${id}`);
        // Connect to inventory service
    }

    public navigateWithUrl(id: number): void {
        console.log(`Navigate item ${id}`);
        // Complete pipeline page
    }
}
