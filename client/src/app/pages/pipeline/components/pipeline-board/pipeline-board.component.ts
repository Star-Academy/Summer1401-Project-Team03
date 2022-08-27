import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {LeaderLinesModel, PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {PROCESS} from '../../../../data/Processes.data';

declare var LeaderLine: any;
declare var AnimEvent: any;

const pipelineNodeDatasDefault: PipelineNodeModel[] = [
    {
        id: '1',
        title: 'Covid',
        processesInfoType: PROCESS.SOURCE,
        position: {x: 40, y: 40},
        openedSettingModal: false,
        leaderLines: [],
        pipelines: [],
        isReplicate: false,
    },
    {
        id: '4',
        title: 'first replicate',
        processesInfoType: PROCESS.REPLICATE,
        position: {x: 260, y: 40},
        openedSettingModal: false,
        leaderLines: [],
        isReplicate: true,
        pipelines: [
            {
                id: '7',
                title: 'second replicate',
                processesInfoType: PROCESS.REPLICATE,
                position: {x: 480, y: 180},
                openedSettingModal: false,
                leaderLines: [],
                isReplicate: true,
                pipelines: [
                    {
                        id: '3',
                        title: 'rename field 1',
                        processesInfoType: PROCESS.FIELD_RENAME,
                        position: {x: 700, y: 180},
                        openedSettingModal: false,
                        leaderLines: [],
                        pipelines: [],
                        isReplicate: false,
                    },
                    {
                        id: '10',
                        title: 'covid renamed',
                        processesInfoType: PROCESS.DESTINATION,
                        position: {x: 920, y: 180},
                        openedSettingModal: false,
                        leaderLines: [],
                        pipelines: [],
                        isReplicate: false,
                    },
                ],
            },
            {
                id: '121',
                title: 'filter data 2',
                processesInfoType: PROCESS.FILTER,
                position: {x: 700, y: 320},
                openedSettingModal: false,
                leaderLines: [],
                pipelines: [],
                isReplicate: false,
            },
            {
                id: '6',
                title: 'covid filtered',
                processesInfoType: PROCESS.DESTINATION,
                position: {x: 920, y: 320},
                openedSettingModal: false,
                leaderLines: [],
                pipelines: [],
                isReplicate: false,
            },
        ],
    },

    {
        id: '120',
        title: 'remove field 3',
        processesInfoType: PROCESS.FIELD_REMOVE,
        position: {x: 480, y: 460},
        openedSettingModal: false,
        leaderLines: [],
        pipelines: [],
        isReplicate: false,
    },

    {
        id: '5',
        title: 'covid removed',
        processesInfoType: PROCESS.DESTINATION,
        position: {x: 700, y: 460},
        openedSettingModal: false,
        leaderLines: [],
        pipelines: [],
        isReplicate: false,
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

    public pipelineNodeDatas: PipelineNodeModel[] = JSON.parse(JSON.stringify(pipelineNodeDatasDefault));
    public leaderLineLinks: any[] = [];
    public animEventObj!: any;

    public constructor(private elRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        const leaderLineInit = (nodes: PipelineNodeModel[]): void => {
            const nodeComponentLength = nodes.length;
            nodes.forEach((node, index, nodeArray) => {
                if (node.isReplicate) {
                    this.connectLeaderLineBetweenTwoElementById(node.id, node.pipelines[0].id, nodes);
                }
                if (index === nodeComponentLength - 1) return;
                this.connectLeaderLineBetweenTwoElementById(node.id, nodeArray[index + 1].id, nodes);
                if (node.pipelines.length > 0) {
                    leaderLineInit(node.pipelines);
                }
            });
        };

        const leaderLineListeners = (): void => {
            console.log(this.leaderLineLinks);
            this.animEventObj = AnimEvent.add(() => {
                console.log(this.leaderLineLinks);
                // this.leaderLineLinks.forEach((ln) => ln.leaderLineObj.position());
                this.leaderLineLinks.forEach((ln) => {
                    console.log(ln.leaderLineObj);
                    ln.leaderLineObj.position();
                });
            });

            function detectResize(leaderLineLinks: any): void {
                leaderLineLinks.forEach((ln: any) => ln.leaderLineObj.position());
            }

            const appBoardEl = this.elRef.nativeElement.querySelector('app-board > .container');
            const pipelineContainerEl = this.elRef.nativeElement.parentElement;

            new ResizeObserver(detectResize.bind(this, this.leaderLineLinks)).observe(pipelineContainerEl);
            appBoardEl.addEventListener('scroll', this.animEventObj);
        };

        leaderLineInit(this.pipelineNodeDatas);
        leaderLineListeners();
    }

    // Node Element
    public clickNodeElement(id: string): void | boolean {
        console.log(`Clicked on ${id}`);
    }

    private isFirstNodeById(id: string): boolean {
        if (this.pipelineNodeDatas[0].id === id) return true;
        return false;
    }
    private isLastNodeById(id: string): boolean {
        if (this.pipelineNodeDatas[this.pipelineNodeDatas.length - 1].id === id) return true;
        return false;
    }

    private addItemToNodeList(insertPlace: number, item: PipelineNodeModel): void {
        this.pipelineNodeDatas.splice(insertPlace, 0, item);
    }

    private removeItemFromNodeList(index: number, count = 1): void {
        this.pipelineNodeDatas.splice(index, count);
    }

    private connectLeaderLineBetweenTwoElementById(
        firstElementId: string,
        secondElementId: string,
        nodes: PipelineNodeModel[]
    ): void | boolean {
        const firstElement = this.getElementRef(firstElementId);
        const secondElement = this.getElementRef(secondElementId);

        const newLeaderLine = new LeaderLine(firstElement, secondElement, this.leaderLineOptions);
        const newLeaderLineObj: LeaderLinesModel = {
            id: firstElementId,
            leaderLineObj: newLeaderLine,
            withId: secondElementId,
        };

        this.leaderLineLinks.push(newLeaderLineObj);
        nodes[this.getNodeIndexById(firstElementId, nodes)].leaderLines.push(newLeaderLineObj);
    }

    public removeConnectionBetweenTwoNode(beforeId: string, afterId: string): void {
        this.removeLeaderlineObjArrayById(beforeId, afterId);
        const beforeIndex = this.getNodeIndexById(beforeId, this.pipelineNodeDatas);

        const leaderlineIndex = this.getLeaderLineIndexById(beforeId, afterId);
        const nodeObj = this.pipelineNodeDatas[beforeIndex];
        nodeObj.leaderLines[leaderlineIndex].leaderLineObj.remove();
        nodeObj.leaderLines.splice(leaderlineIndex, 1);
    }

    private removeLeaderlineObjArrayById(beforeId: string, afterId: string): void {
        const index = this.leaderLineLinks.findIndex((line) => line.id === beforeId && line.withId === afterId);
        console.log(this.leaderLineLinks);
        console.log(index);
        this.leaderLineLinks.splice(index, 1);
    }

    public getLeaderLineIndexById(nodeId: string, leaderlineId: string): number {
        const currentNodeIndex = this.getNodeIndexById(nodeId, this.pipelineNodeDatas);
        return this.pipelineNodeDatas[currentNodeIndex].leaderLines.findIndex((line) => line.withId === leaderlineId);
    }

    public addNodeComponent(item: PipelineNodeModel, beforeNodeId: string): void | boolean {
        if (this.isLastNodeById(beforeNodeId)) return true;
        const beforeNodeIndex = this.getNodeIndexById(beforeNodeId, this.pipelineNodeDatas);
        const afterNodeId = this.getNodeIdByIndex(beforeNodeIndex + 1, this.pipelineNodeDatas);
        const currentNodeId = item.id;

        // Insert to Item to nodeList
        this.addItemToNodeList(beforeNodeIndex + 1, item);
        this.changeDetectorRef.detectChanges();

        this.removeConnectionBetweenTwoNode(beforeNodeId, afterNodeId);
        this.connectLeaderLineBetweenTwoElementById(beforeNodeId, currentNodeId, this.pipelineNodeDatas);
        this.connectLeaderLineBetweenTwoElementById(currentNodeId, afterNodeId, this.pipelineNodeDatas);
    }

    public removeNodeComponent(id: string): void | boolean {
        const currentNodeComponentIndex = this.getNodeIndexById(id, this.pipelineNodeDatas);
        const beforeNodeId = this.getNodeIdByIndex(currentNodeComponentIndex - 1, this.pipelineNodeDatas);
        const afterNodeId = this.getNodeIdByIndex(currentNodeComponentIndex + 1, this.pipelineNodeDatas);

        const removeAllNodeAffect = (id: string): boolean | void => {
            this.removeConnectionBetweenTwoNode(beforeNodeId, id);
            this.removeConnectionBetweenTwoNode(id, afterNodeId);

            // Remove node-element from node-list
            this.removeItemFromNodeList(currentNodeComponentIndex);

            // Remove component from board
            const component = this.getElementRef(id);
            component.remove();
        };

        // The first or last Node that we don't want remove
        if (this.isFirstNodeById(id) || this.isLastNodeById(id)) return true;

        // Create new connection
        this.connectLeaderLineBetweenTwoElementById(beforeNodeId, afterNodeId, this.pipelineNodeDatas);

        // Remove old connection
        removeAllNodeAffect(id);
    }

    public setToUpperLayer(elementId: string): void {
        const component = this.getElementRef(elementId);
        component.style.zIndex = '100';
    }

    public savePositionNodeElement(elementId: string): void {
        const elementIndex = this.getNodeIndexById(elementId, this.pipelineNodeDatas);

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
    public updateLeaderLine(id: string, nodes: PipelineNodeModel[]): void | boolean {
        const currentIndexNode = this.getNodeIndexById(id, nodes);
        // The last one
        // if (this.isLastNodeById(id)) {
        //     this.updateLeaderLineByIndex2(this.getNodeIdByIndex(currentIndexNode - 1, nodes));
        //     return false;
        // }

        this.updateLeaderLineByIndex2(id);

        // It's not The first one
        // if (!this.isFirstNodeById(id)) {
        //     this.updateLeaderLineByIndex2(this.getNodeIdByIndex(currentIndexNode - 1, nodes));
        // }
    }

    private flatArrayToLeaderlineList(nodes: PipelineNodeModel[]): LeaderLinesModel[] {
        const leaderLines: LeaderLinesModel[] = [];
        nodes.forEach((node) => {
            leaderLines.push(...node.leaderLines);
            leaderLines.push(...this.flatArrayToLeaderlineList(node.pipelines));
        });
        return leaderLines;
    }

    private updateLeaderLineByIndex2(id: string): void {
        const pipelines = this.flatArrayToLeaderlineList(this.pipelineNodeDatas);
        const pipelineIndex = pipelines.map((pipeline, idx) => (pipeline.id === id ? idx : '')).filter(String);
        const pipelineWithIndex = pipelines.map((pipeline, idx) => (pipeline.withId === id ? idx : '')).filter(String);

        pipelineIndex.forEach((idx) => {
            pipelines[+idx].leaderLineObj.position();
        });
        pipelineWithIndex.forEach((idx) => {
            pipelines[+idx].leaderLineObj.position();
        });
    }

    private getElementRef(id: string): HTMLElement {
        const nodeComponent = this.mainContainer.querySelector(`app-pipeline-node[id="${id}"]`);
        return nodeComponent;
    }

    private getNodeIndexById(id: string, nodes: PipelineNodeModel[]): number {
        return nodes.findIndex((node) => node.id == id);
    }

    private getNodeIdByIndex(index: number, nodes: PipelineNodeModel[]): string {
        return nodes[index].id;
    }

    public ngOnDestroy(): void {
        const leaderLines = this.flatArrayToLeaderlineList(this.pipelineNodeDatas);
        console.log(leaderLines);
        console.log(this.pipelineNodeDatas);
        leaderLines.forEach((ln) => ln.leaderLineObj.remove());
    }
}
