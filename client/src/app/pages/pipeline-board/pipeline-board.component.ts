import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {PipelineNodeModel} from '../../models/pipeline-node.model';
import {PROCESS} from '../../data/Processes.data';
import {pipelineItemData} from '../../models/pipeline/pipeline-item.model';
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
    {
        id: '5',
        title: 'third filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 800, y: 500},
    },
    {
        id: '6',
        title: 'forth filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 1000, y: 300},
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
    public leaderLineLinks: any[] = [];

    public ngAfterViewInit(): void {
        const leaderLineInit = (): void => {
            const nodeComponentLength = this.pipelineNodeDatas.length;
            this.pipelineNodeDatas.forEach((node, index, nodeArray) => {
                console.log(index);
                console.log(nodeComponentLength);
                if (index === nodeComponentLength - 1) return;
                this.applyLeaderLineBetweenTwoElement(node.id, nodeArray[index + 1].id);
            });
        };
        leaderLineInit();
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
    public updateLeaderLine(id: string): void | boolean {
        // The last one
        if (this.pipelineNodeDatas[this.pipelineNodeDatas.length - 1].id === id) {
            this.leaderLineLinks[this.leaderLineLinks.length - 1].leaderLineObj.position();
            return false;
        }

        const currentLeaderLineIndex = this.leaderLineLinks.findIndex((ln) => ln.id == id);
        this.leaderLineLinks[currentLeaderLineIndex].leaderLineObj.position();

        // The first one
        if (this.leaderLineLinks[currentLeaderLineIndex - 1]) {
            this.leaderLineLinks[currentLeaderLineIndex - 1].leaderLineObj.position();
        }

        return true;
    }
    private getElementRef(id: string): HTMLElement {
        const nodeComponent = this.mainContainer.querySelector(`app-pipeline-node[id="${id}"]`);
        return nodeComponent;
    }
    private applyLeaderLineBetweenTwoElement(firstElementId: string, secondElementId: string): void {
        const firstElement = this.getElementRef(firstElementId);
        const secondElement = this.getElementRef(secondElementId);
        const newLeaderLine = new LeaderLine(firstElement, secondElement, this.leaderLineOptions);
        this.leaderLineLinks.push({id: firstElementId, leaderLineObj: newLeaderLine});
    }
}
