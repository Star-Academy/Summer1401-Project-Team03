import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {InventoryService} from 'src/app/services/inventory.service';
import {SnackbarService} from '../../../../services/snackbar.service';
import {SnackbarObject} from '../../../../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../../../../components/snackbar/enums/snackbar-theme';

@Component({
    selector: 'app-import-button',
    templateUrl: './import-button.component.html',
    styleUrls: ['./import-button.component.scss'],
})
export class ImportButtonComponent {
    @ViewChild('DatasetImport') public modal!: ModalComponent;
    public file: File | null = null;

    public constructor(private inventoryService: InventoryService, private snackbarService: SnackbarService) {}

    public setFile(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length) {
            this.file = files[0];
        }
    }

    public clearFile(): void {
        this.file = null;
    }

    public async uploadFile(): Promise<void> {
        this.modal.closeModal();
        if (this.file) {
            await this.inventoryService.uploadDataSet(this.file);
        }
        this.clearFile();
    }
}
