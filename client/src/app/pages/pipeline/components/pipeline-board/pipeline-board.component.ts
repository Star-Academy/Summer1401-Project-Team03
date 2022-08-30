import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';

import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {LeaderLineModel, NodeRemoveInfoModel, PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {ProcessType} from '../../../../enums/ProcessType.enum';
import {PipelineBoardService} from '../../../../services/pipeline-board.service';

declare var LeaderLine: any;
declare var AnimEvent: any;

const pipelineNodeDatasDefault: PipelineNodeModel[] = [
    {
        id: 1,
        title: 'covid dataset',
        processesInfoType: ProcessType.csv_extractor,
        position: {x: 100, y: 100},
        openedSettingModal: false,
        beforeId: 0,
        afterId: 3,
        leaderlines: [],
    },

    {
        id: 3,
        title: 'location filtered',
        processesInfoType: ProcessType.filter,
        position: {x: 100, y: 300},
        openedSettingModal: false,
        beforeId: 1,
        afterId: 4,
        leaderlines: [],
    },
    {
        id: 4,
        title: 'location renamed',
        processesInfoType: ProcessType.field_renamer,
        position: {x: 400, y: 300},
        openedSettingModal: false,
        beforeId: 3,
        afterId: 5,
        leaderlines: [],
    },
    {
        id: 5,
        title: 'location removed',
        processesInfoType: ProcessType.field_remover,
        position: {x: 400, y: 100},
        openedSettingModal: false,
        beforeId: 4,
        afterId: 6,
        leaderlines: [],
    },
    {
        id: 6,
        title: 'iran filtered',
        processesInfoType: ProcessType.filter,
        position: {x: 700, y: 300},
        openedSettingModal: false,
        beforeId: 5,
        afterId: 7,
        leaderlines: [],
    },
    {
        id: 7,
        title: 'covid',
        processesInfoType: ProcessType.csv_loader,
        position: {x: 700, y: 100},
        openedSettingModal: false,
        beforeId: 6,
        afterId: -1,
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

    // public pipelineNodeDatas: PipelineNodeModel[] = JSON.parse(JSON.stringify(pipelineNodeDatasDefault));
    public pipelineNodeDatas: PipelineNodeModel[] = [];
    public pipelineBoardId!: number;
    public animEventObj!: any;
    public boardEl!: HTMLElement;
    public resizeObserverObj!: ResizeObserver;

    public constructor(
        private elRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        public boardService: PipelineBoardService
    ) {}

    public async ngAfterViewInit(): Promise<void> {
        this.pipelineBoardId = this.boardService.selectedPipelineBoardId;
        this.pipelineNodeDatas = await this.boardService.getAllNode();
        this.changeDetectorRef.detectChanges();
        const leaderLineInit = (): void => {
            this.pipelineNodeDatas.forEach((node, index) => {
                if (node.processesInfoType === ProcessType.csv_loader) return;
                this.connectLeaderLineBetweenTwoElementById(node.id, node.afterId);
            });
        };

        const leaderLineListeners = (): void => {
            this.animEventObj = AnimEvent.add(() => {
                this.pipelineNodeDatas.forEach((node) =>
                    node.leaderlines.forEach((line) => line.leaderLineObj.position())
                );
            });

            function detectResize(pipelineNodeDatas: PipelineNodeModel[]): void {
                pipelineNodeDatas.forEach((node) => node.leaderlines.forEach((line) => line.leaderLineObj.position()));
            }

            const appBoardEl = this.elRef.nativeElement.querySelector('app-board > .container');
            this.boardEl = appBoardEl;
            const pipelineContainerEl = this.elRef.nativeElement.parentElement;

            this.resizeObserverObj = new ResizeObserver(detectResize.bind(this, this.pipelineNodeDatas));
            this.resizeObserverObj.observe(pipelineContainerEl);

            this.boardEl.addEventListener('scroll', this.animEventObj);
        };

        leaderLineInit();
        leaderLineListeners();
    }

    // Node Element
    public clickNodeElement(id: number): void | boolean {
        console.log(`Clicked on ${id}`);
    }

    private addItemToNodeListById(id: number, item: PipelineNodeModel): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas.splice(activeNodeIndex + 1, 0, item);
    }

    private removeItemFromNodeListById(id: number, count = 1): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas.splice(activeNodeIndex, count);
    }

    private removeLeaderlineBetweenTwoNodeById(firstNodeId: number, secondNodeId: number): void {
        const activeNodeIndex = this.getNodeIndexById(firstNodeId);
        const activeLeaderlineNodeIndex = this.pipelineNodeDatas[activeNodeIndex].leaderlines.findIndex(
            (line) => line.currentId === firstNodeId && line.withId === secondNodeId
        );

        this.pipelineNodeDatas[activeNodeIndex].leaderlines[activeLeaderlineNodeIndex].leaderLineObj.remove();
        this.pipelineNodeDatas[activeNodeIndex].leaderlines.splice(activeLeaderlineNodeIndex, 1);
    }

    private changeBeforeIdById(id: number, withId: number): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas[activeNodeIndex].beforeId = withId;
    }

    private changeAfterIdById(id: number, withId: number): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas[activeNodeIndex].afterId = withId;
    }

    private connectLeaderLineBetweenTwoElementById(currentId: number, afterId: number): void {
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
        console.log(this.pipelineNodeDatas);
    }

    public addNodeComponent(item: PipelineNodeModel): void {
        const beforeId = item.beforeId;
        const afterId = item.afterId;

        // is destination

        if (
            [ProcessType.csv_loader, ProcessType.json_loader].some(
                (type: ProcessType) => type == item.processesInfoType
            )
        ) {
            return undefined;
        }

        // Insert to Item to nodeList
        this.addItemToNodeListById(beforeId, item);
        this.changeDetectorRef.detectChanges();

        // Create new Connection
        this.connectLeaderLineBetweenTwoElementById(beforeId, item.id);

        if (
            [ProcessType.json_loader, ProcessType.csv_loader].some(
                (type: ProcessType) => type === item.processesInfoType
            )
        )
            return undefined;

        this.connectLeaderLineBetweenTwoElementById(item.id, afterId);

        // Remove line and connection between before and after new node;
        this.removeLeaderlineBetweenTwoNodeById(beforeId, afterId);

        if (item.processesInfoType === ProcessType.replicate) {
            this.changeBeforeIdById(afterId, item.id);
            return undefined;
        }
        // Update beforeId,afterId, node component
        this.changeAfterIdById(beforeId, item.id);
        this.changeBeforeIdById(afterId, item.id);
    }

    private removeAllAfterNodeById(id: number): void {
        const currentNodeIndex = this.getNodeIndexById(id);
        // const beforeId = this.pipelineNodeDatas[currentNodeIndex].beforeId;
        const afterId = this.pipelineNodeDatas[currentNodeIndex].afterId;
        const type = this.pipelineNodeDatas[currentNodeIndex].processesInfoType;
        console.log(`id man hast: ${id}`);
        if (afterId === -1) return undefined;
        this.removeAllAfterNodeById(afterId);
        this.removeNodeComponent({type, nodeId: id});
    }

    public removeNodeComponent(node: NodeRemoveInfoModel): void | boolean {
        const id = node.nodeId;
        const currentNodeIndex = this.getNodeIndexById(id);

        const beforeId = this.pipelineNodeDatas[currentNodeIndex].beforeId;
        let afterId = this.pipelineNodeDatas[currentNodeIndex].afterId;
        const type = node.type;

        if (type === ProcessType.replicate) {
            this.removeAllAfterNodeById(afterId);
            afterId = this.pipelineNodeDatas[currentNodeIndex].afterId;
        }

        console.log(`${id}, ${beforeId}, ${afterId}`);

        const removeAllNodeAffect = (id: number): void => {
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
        if (
            this.isWhatTypeById(id, [
                ProcessType.csv_extractor,
                ProcessType.json_extractor,
                ProcessType.csv_loader,
                ProcessType.json_loader,
            ])
        ) {
            return undefined;
        }
        // Create new connection
        this.connectLeaderLineBetweenTwoElementById(beforeId, afterId);

        // Remove old connection
        removeAllNodeAffect(id);
    }

    public setToUpperLayer(elementId: number): void {
        const component = this.getElementRef(elementId);
        component.style.zIndex = '100';
    }

    public savePositionNodeElement(nodeId: number): void {
        const elementIndex = this.getNodeIndexById(nodeId);

        const component = this.getElementRef(nodeId);
        component.style.zIndex = '10';

        const newPosition = {x: component?.offsetLeft, y: component?.offsetTop};

        // Update element position
        this.pipelineNodeDatas[elementIndex].position.x = newPosition.x;
        this.pipelineNodeDatas[elementIndex].position.y = newPosition.y;

        console.log(`${nodeId}: X:${newPosition.x}|Y:${newPosition.y}`);

        this.boardService.changeComponentPosition({
            pipelineID: this.pipelineBoardId,
            componentID: nodeId,
            position: newPosition,
        });
    }

    // LeaderLine
    public updateLeaderLine(currentId: number): void | boolean {
        // The last one

        if (this.isWhatTypeById(currentId, [ProcessType.csv_loader, ProcessType.json_loader])) {
            this.updateLeaderLineById(currentId);
        }

        const currentIndex = this.getNodeIndexById(currentId);
        const beforeId = this.pipelineNodeDatas[currentIndex].beforeId;
        this.updateLeaderLineById(currentId);

        // // It's not The first one

        if (!this.isWhatTypeById(currentId, [ProcessType.csv_extractor, ProcessType.json_extractor])) {
            console.log(beforeId);
            this.updateLeaderLineById(beforeId);
        }
    }

    private isWhatTypeById(id: number, types: ProcessType[]): boolean {
        const currentNodeIndex = this.getNodeIndexById(id);
        return types.some((type) => type === this.pipelineNodeDatas[currentNodeIndex].processesInfoType);
    }

    private updateLeaderLineById(id: number): void {
        const activeNodeIndex = this.getNodeIndexById(id);
        this.pipelineNodeDatas[activeNodeIndex].leaderlines.forEach((line) => {
            line.leaderLineObj.position();
        });
    }

    private getElementRef(id: number): HTMLElement {
        const nodeComponent = this.mainContainer.querySelector(`app-pipeline-node[id="${id}"]`);
        return nodeComponent;
    }

    private getNodeIndexById(id: number): number {
        return this.pipelineNodeDatas.findIndex((node) => node.id == id);
    }

    public ngOnDestroy(): void {
        // this.leaderLineLinks.forEach((ln) => ln.leaderLineObj.remove());
        // this.leaderLineLinks = [];
        this.pipelineNodeDatas.forEach((node) => {
            console.log(node.leaderlines);
            node.leaderlines.forEach((line) => line.leaderLineObj.remove());
        });
        this.resizeObserverObj.unobserve(this.elRef.nativeElement.parentElement);
        this.boardEl.removeEventListener('scroll', this.animEventObj);
    }
}
