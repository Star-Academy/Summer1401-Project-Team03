import {Component} from '@angular/core';
import {pipelineItemData, PipelineItemModel} from '../../models/pipeline/pipeline-item.model';

const pipelineItemData2: PipelineItemModel[] = [
    {
        name: 'covid',
        createAt: new Date(),
        id: 1,
        modifiedAt: new Date(),
    },
];

@Component({
    selector: 'app-pipeline-inventory',
    templateUrl: './pipeline-inventory.component.html',
    styleUrls: ['./pipeline-inventory.component.scss'],
})
export class PipelineInventoryComponent {
    // public pipelineItem: PipelineItemModel[] = pipelineItemData2;
    public pipelineItem: PipelineItemModel[] = [
        {
            name: 'covid',
            createAt: new Date(),
            id: 1,
            modifiedAt: new Date(),
        },
    ];
    public harchi = [2, 4, 5, 6];
    // public constructor() {
    // console.log(this.pipelineItem);
    // }
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
