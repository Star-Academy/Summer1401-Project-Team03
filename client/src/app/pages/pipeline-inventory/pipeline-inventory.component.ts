import {Component} from '@angular/core';
import {pipelineItemData, PipelineItemModel} from '../../models/pipeline/pipeline-item.model';

@Component({
    selector: 'app-pipeline-inventory',
    templateUrl: './pipeline-inventory.component.html',
    styleUrls: ['./pipeline-inventory.component.scss'],
})
export class PipelineInventoryComponent {
    public pipelineItem: PipelineItemModel[] = pipelineItemData;

    public convertDate(date: Date): string {
        return date.toLocaleString('en-Za', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
            second: '2-digit',
        });
    }
}
