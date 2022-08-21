import {Component} from '@angular/core';
import {pipelineItemData, PipelineItemModel} from '../../models/pipeline/pipeline-item.model';

@Component({
    selector: 'app-pipeline-inventory',
    templateUrl: './pipeline-inventory.component.html',
    styleUrls: ['./pipeline-inventory.component.scss'],
})
export class PipelineInventoryComponent {
    public searchPhrase: string = '';
    public pipelineItem: PipelineItemModel[] = pipelineItemData;
}
