import {Component} from '@angular/core';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-dataset.svg-inventory',
    templateUrl: './dataset-inventory.component.html',
    styleUrls: ['./dataset-inventory.component.scss'],
})
export class DatasetInventoryComponent {
    public searchPhrase: string = '';

    public toggleShowItemSettingModal(id: number): void {
        const item = this.datasetItems.find((item) => item.id === id);
        if (item) item.openedSettingModal = !item.openedSettingModal;
    }

    public renameItem(id: number): void {
        console.log(`Renamed item ${id}`);
        // Connect to inventory service
    }

    public downloadItem(id: number): void {
        console.log(`Downloaded item ${id}`);
        // Connect to inventory service
    }

    public navigateWithUrl(id: number): void {
        console.log(`Navigate item ${id}`);
        // Complete pipeline page
    }
}
