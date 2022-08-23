import {Component, ElementRef, OnInit} from '@angular/core';
import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {PipelineNodeModel} from '../../models/pipeline-node.model';

const pipelineNodeDataDefault: PipelineNodeModel = {
    id: '2',
    label: 'filter',
    type: 'filter',
    iconType: 'filter',
    position: {x: 100, y: 100},
};

@Component({
    selector: 'app-pipeline-board',
    templateUrl: './pipeline-board.component.html',
    styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent {
    public constructor(private elRef: ElementRef) {}
    public pipelineNodeData: PipelineNodeModel = pipelineNodeDataDefault;

    public draggabillyOptions: NgxDraggabillyOptions = {
        containment: true,
    };

    // Node Element
    public clickNodeElement(id: string): void {
        console.log(`Clicked on ${id}`);
    }

    public savePositionNodeElement(elementId: string): void {
        const mainContainer = this.elRef.nativeElement;
        const nodeComponent = mainContainer.querySelector(`app-pipeline-node[id="${elementId}"]`);
        const newPosition = {x: nodeComponent.offsetLeft, y: nodeComponent.offsetTop};
        console.log(newPosition);
        //   Connect to Service
    }
}
