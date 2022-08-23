import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-pipeline-add-button',
    templateUrl: './pipeline-add-button.component.html',
    styleUrls: ['./pipeline-add-button.component.scss'],
})
export class PipelineAddButtonComponent {
    @ViewChild('pipelineAdd') public modal!: ModalComponent;
    public file: File | null = null;

    public constructor(private inventoryService: InventoryService) {}

    public setFile(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length) {
            this.file = files[0];
        }
    }

    public async uploadFile(): Promise<void> {
        if (this.file) await this.inventoryService.uploadDataSet(this.file);
    }
}
