import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {InventoryService} from 'src/app/services/inventory.service';

@Component({
    selector: 'app-pipeline-add-button',
    templateUrl: './pipeline-add-button.component.html',
    styleUrls: ['./pipeline-add-button.component.scss'],
})
export class PipelineAddButtonComponent {
    @ViewChild('PipelineAdd') public modal!: ModalComponent;
    public pipelineName: string = '';

    public createPipeline(): void {}

    public clearName(): void {
        this.pipelineName = '';
    }
}
