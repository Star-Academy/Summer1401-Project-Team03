import {Component} from '@angular/core';
import {PipelineService} from 'src/app/services/pipeline.service';
import {pipelineItemData, PipelineItemModel} from '../../models/pipeline/pipeline-item.model';

@Component({
    selector: 'app-pipeline-inventory',
    templateUrl: './pipeline-inventory.component.html',
    styleUrls: ['./pipeline-inventory.component.scss'],
})
export class PipelineInventoryComponent {
    public searchPhrase: string = '';

    public constructor(public pipelineService: PipelineService) {}

    public openItemSettingModal(id: number): void {
        const item = this.pipelineService.pipelines.find((item) => item.id === id);
        if (item) item.openedSettingModal = true;
    }

    public closeItemSettingModal(id: number): void {
        const item = this.pipelineService.pipelines.find((item) => item.id === id);
        if (item) item.openedSettingModal = false;
    }

    public renameItem(id: number): void {
        console.log(`Renamed item ${id}`);
        // Connect to inventory service
    }

    public deleteItem(id: number): void {
        console.log(`Removed item ${id}`);
        // Connect to inventory service
    }

    public navigateWithUrl(id: number): void {
        console.log(`Navigate item ${id}`);
        // Complete pipeline page
    }
}
