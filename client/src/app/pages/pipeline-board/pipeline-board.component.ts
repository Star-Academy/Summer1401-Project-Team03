import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {PipelineNodeModel} from '../../models/pipeline-node.model';
import {PROCESS} from '../../data/Processes.data';
declare var LeaderLine: any;

const pipelineNodeDatasDefault: PipelineNodeModel[] = [
    {
        id: '2',
        title: 'first filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 100, y: 100},
    },
    {
        id: '4',
        title: 'second filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 300, y: 700},
    },
];

@Component({
    selector: 'app-pipeline-board',
    templateUrl: './pipeline-board.component.html',
    styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent implements AfterViewInit {
    @ViewChild('item1', {static: true}) item1: any;
    @ViewChild('item2', {static: true}) item2: any;
    public constructor(private elRef: ElementRef) {}
    public pipelineNodeDatas: PipelineNodeModel[] = pipelineNodeDatasDefault;
    public draggabillyOptions: NgxDraggabillyOptions = {
        containment: true,
    };
    public leaderLine1And2: any;

    public ngAfterViewInit(): void {
        const nodeComponents = this.elRef.nativeElement.querySelectorAll('app-pipeline-node');

        console.log(LeaderLine);
        console.log(this.item1);
        console.log(this.item2);
        console.log(nodeComponents);
        this.leaderLine1And2 = new LeaderLine(this.item1.nativeElement, this.item2.nativeElement);
    }

    // Node Element
    public clickNodeElement(id: string): void {
        console.log(`Clicked on ${id}`);
    }

    public savePositionNodeElement(elementId: string): void {
        const mainContainer = this.elRef.nativeElement;
        const nodeComponent = mainContainer.querySelector(`app-pipeline-node[id="${elementId}"]`);
        const newPosition = {x: nodeComponent.offsetLeft, y: nodeComponent.offsetTop};
        console.log(`${elementId}: X:${newPosition.x}|Y:${newPosition.y}`);
        //   TODO Connect to Service
    }
}
