import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {LeaderLineModel, PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {PROCESS} from '../../../../data/Processes.data';

declare var LeaderLine: any;
declare var AnimEvent: any;

const pipelineNodeDatasDefault: PipelineNodeModel[] = [
    {
        id: '1',
        title: 'first filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 100, y: 100},
        openedSettingModal: false,
        beforeId: '0',
        afterId: '3',
        leaderlines: [],
    },

    {
        id: '3',
        title: 'third filter',
        processesInfoType: PROCESS.JOIN,
        position: {x: 100, y: 300},
        openedSettingModal: false,
        beforeId: '1',
        afterId: '4',
        leaderlines: [],
    },
    {
        id: '4',
        title: 'forth filter',
        processesInfoType: PROCESS.FIELD_RENAME,
        position: {x: 400, y: 300},
        openedSettingModal: false,
        beforeId: '3',
        afterId: '5',
        leaderlines: [],
    },
    {
        id: '5',
        title: 'fifth filter',
        processesInfoType: PROCESS.FIELD_REMOVE,
        position: {x: 400, y: 100},
        openedSettingModal: false,
        beforeId: '4',
        afterId: '6',
        leaderlines: [],
    },
    {
        id: '6',
        title: 'sixth filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 700, y: 300},
        openedSettingModal: false,
        beforeId: '5',
        afterId: '7',
        leaderlines: [],
    },
    {
        id: '7',
        title: 'seventh filter',
        processesInfoType: PROCESS.JOIN,
        position: {x: 700, y: 100},
        openedSettingModal: false,
        beforeId: '6',
        afterId: '-2',
        leaderlines: [],
    },
];

@Component({
    selector: 'app-pipeline-board',
    templateUrl: './pipeline-board.component.html',
    styleUrls: ['./pipeline-board.component.scss'],
})
export class PipelineBoardComponent implements AfterViewInit, OnDestroy {
    private mainContainer = this.elRef.nativeElement;
    public leaderLineOptions: object = {
        color: 'var(--color-purple-86)',
        outlineColor: 'var(--color-purple-46)',
        outline: true,
        endPlugOutline: true,
        endPlugSize: 0.8,
    };

    public draggabillyOptions: NgxDraggabillyOptions = {
        containment: true,
        grid: [20, 20],
    };

    public pipelineNodeDatas: PipelineNodeModel[] = pipelineNodeDatasDefault;
    public leaderLineLinks: LeaderLineModel[] = [];
    public animEventObj!: any;

    public constructor(private elRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        const leaderLineInit = (): void => {
            const nodeComponentLength = this.pipelineNodeDatas.length;
            this.pipelineNodeDatas.forEach((node, index) => {
                if (index === nodeComponentLength - 1) return;
                this.connectLeaderLineBetweenTwoElementById(node.id, node.afterId);
            });
        };

        const leaderLineListeners = (): void => {
            this.animEventObj = AnimEvent.add(() => {
                this.leaderLineLinks.forEach((ln) => ln.leaderLineObj.position());
            });

            function detectResize(leaderLineLinks: any): void {
                leaderLineLinks.forEach((ln: any) => ln.leaderLineObj.position());
            }

            const appBoardEl = this.elRef.nativeElement.querySelector('app-board > .container');
            const pipelineContainerEl = this.elRef.nativeElement.parentElement;

            new ResizeObserver(detectResize.bind(this, this.leaderLineLinks)).observe(pipelineContainerEl);
            appBoardEl.addEventListener('scroll', this.animEventObj);
        };

        leaderLineInit();
        leaderLineListeners();
    }

    // Node Element
    public clickNodeElement(id: string): void | boolean {
        console.log(`Clicked on ${id}`);
    }

    private addItemToNodeListById(id: string, item: PipelineNodeModel): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas.splice(activeNodeIndex, 0, item);
    }

    private removeItemFromNodeListById(id: string, count = 1): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas.splice(activeNodeIndex, count);
    }

    private removeLeaderlineBetweenTwoNodeById(firstNodeId: string, secondNodeId: string): void {
        const activeNodeIndex = this.getNodeIndexById(firstNodeId);
        const activeLeaderlineNodeIndex = this.pipelineNodeDatas[activeNodeIndex].leaderlines.findIndex(
            (line) => line.currentId === firstNodeId && line.withId === secondNodeId
        );

        this.pipelineNodeDatas[activeNodeIndex].leaderlines[activeLeaderlineNodeIndex].leaderLineObj.remove();
        this.pipelineNodeDatas[activeNodeIndex].leaderlines.splice(activeLeaderlineNodeIndex, 1);
    }

    private changeBeforeIdById(id: string, withId: string): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas[activeNodeIndex].beforeId = withId;
    }

    private changeAfterIdById(id: string, withId: string): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas[activeNodeIndex].afterId = withId;
    }

    private connectLeaderLineBetweenTwoElementById(currentId: string, afterId: string): void {
        const firstElement = this.getElementRef(currentId);
        const secondElement = this.getElementRef(afterId);
        const newLeaderLine = new LeaderLine(firstElement, secondElement, this.leaderLineOptions);
        const newLeaderLineObj: LeaderLineModel = {
            currentId: currentId,
            withId: afterId,
            leaderLineObj: newLeaderLine,
        };

        const currentIndex = this.getNodeIndexById(currentId);
        this.pipelineNodeDatas[currentIndex].leaderlines.push(newLeaderLineObj);
    }

    public addNodeComponent(item: PipelineNodeModel, beforeId: string, afterId: string): void {
        // is destination
        if (this.isWhatTypeById(beforeId, 'destination')) {
            return undefined;
        }

        // Insert to Item to nodeList
        this.addItemToNodeListById(beforeId, item);
        this.changeDetectorRef.detectChanges();

        // Create new Connection
        this.connectLeaderLineBetweenTwoElementById(beforeId, item.id);
        this.connectLeaderLineBetweenTwoElementById(item.id, afterId);

        // Remove line and connection between before and after new node;
        this.removeLeaderlineBetweenTwoNodeById(beforeId, afterId);

        // Update beforeId,afterId, node component
        this.changeAfterIdById(beforeId, afterId);
        this.changeBeforeIdById(afterId, beforeId);
    }

    public removeNodeComponent(id: string, beforeId: string, afterId: string): void | boolean {
        const removeAllNodeAffect = (id: string): void => {
            // Remove Line and connection line
            this.removeLeaderlineBetweenTwoNodeById(beforeId, id);
            this.removeLeaderlineBetweenTwoNodeById(id, afterId);

            // Update beforeId,afterId, node component
            this.changeAfterIdById(beforeId, afterId);
            this.changeBeforeIdById(afterId, beforeId);

            // Remove node-element from node-list
            this.removeItemFromNodeListById(id);

            // Remove component from board
            const component = this.getElementRef(id);
            component.remove();
        };

        // The first or last Node that we don't want remove
        if (this.isWhatTypeById(id, 'source') || this.isWhatTypeById(id, 'destination')) return undefined;

        // Create new connection
        this.connectLeaderLineBetweenTwoElementById(beforeId, afterId);

        // Remove old connection
        removeAllNodeAffect(id);
    }

    public setToUpperLayer(elementId: string): void {
        const component = this.getElementRef(elementId);
        component.style.zIndex = '100';
    }

    public savePositionNodeElement(elementId: string): void {
        const elementIndex = this.getNodeIndexById(elementId);

        const component = this.getElementRef(elementId);
        component.style.zIndex = '10';

        const newPosition = {x: component?.offsetLeft, y: component?.offsetTop};

        // Update element position
        this.pipelineNodeDatas[elementIndex].position.x = newPosition.x;
        this.pipelineNodeDatas[elementIndex].position.y = newPosition.y;

        console.log(`${elementId}: X:${newPosition.x}|Y:${newPosition.y}`);
        //   TODO Connect to Service
    }

    // LeaderLine
    public updateLeaderLine(currentId: string): void | boolean {
        // The last one
        if (this.isWhatTypeById(currentId, 'destination')) {
            this.updateLeaderLineById(currentId);
        }

        const currentIndex = this.getNodeIndexById(currentId);
        const beforeId = this.pipelineNodeDatas[currentIndex].beforeId;
        this.updateLeaderLineById(currentId);

        // // It's not The first one
        if (!this.isWhatTypeById(currentId, 'source')) {
            console.log(beforeId);
            this.updateLeaderLineById(beforeId);
        }
    }

    private isWhatTypeById(id: string, type: string): boolean {
        const currentNodeIndex = this.getNodeIndexById(id);
        return this.pipelineNodeDatas[currentNodeIndex].processesInfoType.title === type ? true : false;
    }

    private updateLeaderLineById(id: string): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas[activeNodeIndex].leaderlines.forEach((line) => {
            line.leaderLineObj.position();
        });
    }

    private getElementRef(id: string): HTMLElement {
        const nodeComponent = this.mainContainer.querySelector(`app-pipeline-node[id="${id}"]`);
        return nodeComponent;
    }

    private getNodeIndexById(id: string): number {
        return this.pipelineNodeDatas.findIndex((node) => node.id == id);
    }

    public ngOnDestroy(): void {
        this.leaderLineLinks.forEach((ln) => ln.leaderLineObj.remove());
        this.leaderLineLinks = [];
    }
}
