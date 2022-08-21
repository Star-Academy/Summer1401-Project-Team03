import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-import-button',
    templateUrl: './import-button.component.html',
    styleUrls: ['./import-button.component.scss'],
})
export class ImportButtonComponent {
    @ViewChild('importModal') public modal!: ModalComponent;

    public file: File | null = null;

    public constructor(public inventoryService: InventoryService) {}

    public handleUpload(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (files?.length) {
            this.file = files[0];
            console.log(this.file);
        }
        console.log(files);
    }

    public async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        if (!this.file) {
            return;
        }
    }
}
