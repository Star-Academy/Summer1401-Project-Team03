import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';

@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent {
    @Input() pipelineNodeData!: PipelineNodeModel;
}
