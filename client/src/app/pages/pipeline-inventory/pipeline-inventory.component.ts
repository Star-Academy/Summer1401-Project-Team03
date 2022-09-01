import {Component} from '@angular/core';
import {PipelineService} from '../../services/pipeline.service';

@Component({
    selector: 'app-pipeline-inventory',
    templateUrl: './pipeline-inventory.component.html',
    styleUrls: ['./pipeline-inventory.component.scss'],
})
export class PipelineInventoryComponent {
    public searchPhrase: string = '';

    public constructor(public pipelineService: PipelineService) {}

    public renameItem(id: number): void {
        console.log(`Renamed item ${id}`);
        // Connect to inventory service
    }

    public deleteItem(id: number): void {
        this.pipelineService.deletePipeline(id);
        console.log(`Removed item ${id}`);
        this.pipelineService.deletePipeline(id);
        // Connect to inventory service
    }

    public navigateWithUrl(id: number): void {
        console.log(`Navigate item ${id}`);
        // Complete pipeline page
    }
}
