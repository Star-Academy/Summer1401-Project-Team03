import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {AVAILABLE_FILE_TYPES} from 'src/app/data/AvailableFileTypes.data';
import {NewPipeline} from 'src/app/models/NewPipeline.interface';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-pipeline-add-button',
    templateUrl: './pipeline-add-button.component.html',
    styleUrls: ['./pipeline-add-button.component.scss'],
})
export class PipelineAddButtonComponent {
    @ViewChild('PipelineAdd') public modal!: ModalComponent;

    public initialForm: NewPipeline = {
        pipelineName: '',
        sourceId: '',
        destinationName: '',
        destinationType: '',
    };

    public fileTypes = AVAILABLE_FILE_TYPES;

    public formData: NewPipeline = this.initialForm;

    public createPipeline(): void {}

    public clearForm(): void {
        this.formData = this.initialForm;
    }
}
