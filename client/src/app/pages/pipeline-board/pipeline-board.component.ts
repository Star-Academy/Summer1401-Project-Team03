import {Component, OnInit} from '@angular/core';
import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {PipelineNodeModel} from '../../models/pipeline-node.model';

const pipelineNodeDataDefault: PipelineNodeModel = {
    id: '2',
    label: 'filter',
    type: 'filter',
    iconType: 'filter',
};

@Component({
    selector: 'app-pipeline-board',
    templateUrl: './pipeline-board.component.html',
    styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent {
    public pipelineNodeData: PipelineNodeModel = pipelineNodeDataDefault;

    public draggabillyOptions: NgxDraggabillyOptions = {
        containment: true,
    };

    // Node Element
    public clickNodeElement(id: string): void {
        console.log(`Clicked on ${id}`);
    }
}
