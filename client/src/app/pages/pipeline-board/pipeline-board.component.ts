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
    private mainContainer = this.elRef.nativeElement;
    public leaderLineOptions: object = {
        color: 'var(--color-purple-86)',
        outlineColor: 'var(--color-purple-46)',
        outline: true,
        endPlugOutline: true,
        endPlugSize: 0.8,
    };
    public constructor(private elRef: ElementRef) {}
    public pipelineNodeDatas: PipelineNodeModel[] = pipelineNodeDatasDefault;
    public draggabillyOptions: NgxDraggabillyOptions = {
        containment: true,
    };
    public leaderLine1And2: any;

    public ngAfterViewInit(): void {
        const nodeComponents = this.elRef.nativeElement.querySelectorAll('app-pipeline-node');
        this.leaderLine1And2 = new LeaderLine(nodeComponents[0], nodeComponents[1], this.leaderLineOptions);
    }

    // Node Element
    public clickNodeElement(id: string): void {
        console.log(`Clicked on ${id}`);
    }

    public savePositionNodeElement(elementId: string): void {
        const component = this.getElementRef(elementId);
        const newPosition = {x: component?.offsetLeft, y: component?.offsetTop};
        console.log(`${elementId}: X:${newPosition.x}|Y:${newPosition.y}`);
        //   TODO Connect to Service
    }

    // LeaderLine
    public updateLeaderLine(): void {
        this.leaderLine1And2.position();
    }
    private getElementRef(id: string): HTMLElement {
        const nodeComponent = this.mainContainer.querySelector(`app-pipeline-node[id="${id}"]`);
        return nodeComponent;
    }
}
