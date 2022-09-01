import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {AVAILABLE_FILE_TYPES} from 'src/app/data/AvailableFileTypes.data';
import {DatalistOption} from 'src/app/models/DatalistOption.interface';

import {InventoryService} from 'src/app/services/inventory.service';
import {PipelineService} from '../../../../services/pipeline.service';
import {NewPipeline} from '../../../../models/NewPipeline.interface';

@Component({
    selector: 'app-pipeline-add-button',
    templateUrl: './pipeline-add-button.component.html',
    styleUrls: ['./pipeline-add-button.component.scss'],
})
export class PipelineAddButtonComponent {
    @ViewChild('PipelineAdd') public modal!: ModalComponent;

    public initialForm: NewPipeline = {
        pipelineName: '',
        sourceFileId: '',
        destFileName: '',
        destFileFormat: '',
    };

    public fileTypes = AVAILABLE_FILE_TYPES;

    public formData: NewPipeline = this.initialForm;

    public constructor(
        private pipelineService: PipelineService,
        public inventoryService: InventoryService,
        private router: Router
    ) {}

    public async createPipeline(): Promise<void> {
        const response = await this.pipelineService.createPipeline(this.formData);
        if (response) {
            this.router.navigateByUrl(`/pipeline/${response}`);
        }
    }

    public clearForm(): void {
        this.formData = this.initialForm;
    }
}
