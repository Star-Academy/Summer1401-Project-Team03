import {Component} from '@angular/core';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-dataset.svg-inventory',
    templateUrl: './dataset-inventory.component.html',
    styleUrls: ['./dataset-inventory.component.scss'],
})
export class DatasetInventoryComponent {
    public searchPhrase: string = '';

    public constructor(public inventoryService: InventoryService) {}

    public openItemSettingModal(id: string): void {
        const item = this.inventoryService.dataset.find((item) => item.id === id);
        if (item) item.openedSettingModal = true;
    }

    public closeItemSettingModal(id: string): void {
        const item = this.inventoryService.dataset.find((item) => item.id === id);
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

    public navigateWithUrl(id: number): void {
        console.log(`Navigate item ${id}`);
        // Complete pipeline page
    }
}
