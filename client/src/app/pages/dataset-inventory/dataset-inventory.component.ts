import {Component} from '@angular/core';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-dataset.svg-inventory',
    templateUrl: './dataset-inventory.component.html',
    styleUrls: ['./dataset-inventory.component.scss'],
})
export class DatasetInventoryComponent {
    public searchPhrase: string = '';

    public get emptyTexts(): string[] {
        return ['there are no datasets.', "why don't you import something?"];
    }

    public constructor(public inventoryService: InventoryService) {}

    public openItemSettingModal(id: number): void {
        const item = this.inventoryService.dataset.find((item) => item.id === id);
        if (item) item.openedSettingModal = true;
    }

    public closeItemSettingModal(id: number): void {
        const item = this.inventoryService.dataset.find((item) => item.id === id);
        if (item) item.openedSettingModal = false;
    }

    public toggleShowItemSettingModal(id: number): void {
        const item = this.inventoryService.dataset.find((item) => item.id === id);
        if (item) item.openedSettingModal = !item.openedSettingModal;
    }

    public renameItem(newTitle: string): void {
        console.log(`Renamed item ${newTitle}`);
        // Connect to inventory service
    }

    public async downloadItem(id: number, category: string): Promise<void> {
        console.log(`Downloaded item ${id}`);
        // Connect to inventory service
    }

    public navigateWithUrl(id: number): void {
        console.log(`Navigate item ${id}`);
        // Complete pipeline page
    }
}
