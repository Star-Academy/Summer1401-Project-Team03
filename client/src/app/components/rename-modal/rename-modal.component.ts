import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {InventoryService} from '../../services/inventory.service';
import {DatasetRenameModel} from '../../models/dataset/dataset-item.model';

@Component({
    selector: 'app-rename-modal',
    templateUrl: './rename-modal.component.html',
    styleUrls: ['./rename-modal.component.scss'],
})
export class RenameModalComponent {
    @ViewChild('renameModal') public modal!: ModalComponent;
    public newRenameData: DatasetRenameModel = {newName: '', fileId: 0, category: ''};

    public constructor(private inventoryService: InventoryService) {}

    public openModal(fileId: number, category: string, oldTitle: string): void {
        console.log(oldTitle);
        this.newRenameData = {fileId, category, newName: oldTitle};
        this.modal.openModal();
    }

    public renameHandle(): void {
        this.inventoryService.renameDataset(this.newRenameData);
        this.modal.closeModal();
    }
}
