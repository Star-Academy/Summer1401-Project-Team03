import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {NgxDraggabillyOptions} from 'ngx-draggabilly';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';
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
    },

    {
        id: '3',
        title: 'third filter',
        processesInfoType: PROCESS.JOIN,
        position: {x: 100, y: 300},
        openedSettingModal: false,
    },
    {
        id: '4',
        title: 'forth filter',
        processesInfoType: PROCESS.FIELD_RENAME,
        position: {x: 400, y: 300},
        openedSettingModal: false,
    },
    {
        id: '5',
        title: 'fifth filter',
        processesInfoType: PROCESS.FIELD_REMOVE,
        position: {x: 400, y: 100},
        openedSettingModal: false,
    },
    {
        id: '6',
        title: 'sixth filter',
        processesInfoType: PROCESS.FILTER,
        position: {x: 700, y: 300},
        openedSettingModal: false,
    },
    {
        id: '7',
        title: 'seventh filter',
        processesInfoType: PROCESS.JOIN,
        position: {x: 700, y: 100},
        openedSettingModal: false,
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
    public leaderLineLinks: any[] = [];
    public animEventObj!: any;

    public constructor(private elRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        const leaderLineInit = (): void => {
            const nodeComponentLength = this.pipelineNodeDatas.length;
            this.pipelineNodeDatas.forEach((node, index, nodeArray) => {
                if (index === nodeComponentLength - 1) return;
                this.applyLeaderLineBetweenTwoElement(node.id, nodeArray[index + 1].id);
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

    public isFirstNodeById(id: string): boolean {
        if (this.pipelineNodeDatas[0].id === id) return true;
        return false;
    }
    public isLastNodeById(id: string): boolean {
        if (this.pipelineNodeDatas[this.pipelineNodeDatas.length - 1].id === id) return true;
        return false;
    }
    public isLastLeaderById(id: string): boolean {
        if (this.leaderLineLinks[this.leaderLineLinks.length - 1].id === id) return true;
        return false;
    }

    public replaceOneLineInsteadTwoLine(leaderId: string, nodeId: string): void {
        const leaderIndex = this.getLeaderIndexById(leaderId);
        const nodeIndex = this.getNodeIndexById(nodeId);
    }
    public removeItemFromLeaderLine(index: number, count = 1): void {
        this.leaderLineLinks.splice(index, count);
    }
    public removeItemFromNodeList(index: number, count = 1): void {
        this.pipelineNodeDatas.splice(index, count);
    }
    public addItemToLeaderLine(insertPlace: number, item: object): void {
        this.leaderLineLinks.splice(insertPlace, 0, item);
    }
    public addItemToNodeList(insertPlace: number, item: PipelineNodeModel): void {
        this.pipelineNodeDatas.splice(insertPlace, 0, item);
    }
    public connectLeaderLineBetweenTwoElementById(
        firstElementId: string,
        secondElementId: string,
        insertPlace = 0,
        isPush = false
    ): void | boolean {
        const firstElement = this.getElementRef(firstElementId);
        const secondElement = this.getElementRef(secondElementId);

        const newLeaderLine = new LeaderLine(firstElement, secondElement, this.leaderLineOptions);
        const newLeaderLineObj = {id: firstElementId, leaderLineObj: newLeaderLine};
        if (isPush) {
            this.leaderLineLinks.push(newLeaderLineObj);
        }

        this.addItemToLeaderLine(insertPlace, newLeaderLineObj);
    }

    public removeNodeComponent(id: string): void | boolean {
        const removeAllNodeAffect = (id: string): boolean | void => {
            // Remove node-element from node-list
            this.pipelineNodeDatas.splice(currentNodeComponentIndex, 1);

            // Remove connection line
            // const currentLeaderLineIndex = this.leaderLineLinks.findIndex((ln) => ln.id == id);
            const currentLeaderLineIndex = this.getLeaderIndexById(id);
            this.leaderLineLinks[currentLeaderLineIndex].leaderLineObj.remove();
            // TODO leaderlineLinks removeer
            this.leaderLineLinks[currentLeaderLineIndex - 1].leaderLineObj.remove();
            this.leaderLineLinks.splice(currentLeaderLineIndex - 1, 2);

            // Remove component from board
            const component = this.getElementRef(id);
            component.remove();
        };

        // The first or last Node that we don't want remove
        if (this.isFirstNodeById(id) || this.isLastNodeById(id)) return true;

        const currentNodeComponentIndex = this.getNodeIndexById(id);

        // Create new connection
        this.applyLeaderLineBetweenTwoElement(
            this.pipelineNodeDatas[currentNodeComponentIndex - 1].id,
            this.pipelineNodeDatas[currentNodeComponentIndex + 1].id,
            true
        );

        // Remove old connection
        removeAllNodeAffect(id);
    }

    public addNodeComponent(item: PipelineNodeModel, backNodeId: string): void {
        console.log('before:');
        console.log(this.leaderLineLinks);
        console.log(this.pipelineNodeDatas);

        const currentNodeComponentIndex = this.getNodeIndexById(backNodeId);
        this.pipelineNodeDatas.splice(currentNodeComponentIndex + 1, 0, item);
        this.changeDetectorRef.detectChanges();

        this.applyLeaderLineBetweenTwoElement(
            this.pipelineNodeDatas[currentNodeComponentIndex].id,
            item.id,
            false,
            true
        );

        const currentLeaderLineIndex = this.getLeaderIndexById(backNodeId);
        this.leaderLineLinks[currentLeaderLineIndex].leaderLineObj.remove();
        this.leaderLineLinks.splice(currentLeaderLineIndex, 1);

        if (this.isLastLeaderById(backNodeId)) {
            this.applyLeaderLineBetweenTwoElement(item.id, this.pipelineNodeDatas[currentNodeComponentIndex + 2].id);
        } else {
            this.applyLeaderLineBetweenTwoElement(
                item.id,
                this.pipelineNodeDatas[currentNodeComponentIndex + 2].id,
                false,
                false,
                true
            );
        }

        console.log('after:');
        console.log(this.leaderLineLinks);
        console.log(this.pipelineNodeDatas);
    }

    public setToUpperLayer(elementId: string): void {
        const component = this.getElementRef(elementId);
        component.style.zIndex = '100';
    }

    public savePositionNodeElement(elementId: string): void {
        const component = this.getElementRef(elementId);
        const newPosition = {x: component?.offsetLeft, y: component?.offsetTop};
        component.style.zIndex = '10';
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

    private getLeaderIndexById(id: string): number {
        return this.leaderLineLinks.findIndex((ln) => ln.id == id);
    }

    private getNodeIndexById(id: string): number {
        return this.pipelineNodeDatas.findIndex((node) => node.id == id);
    }

    private applyLeaderLineBetweenTwoElement(
        firstElementId: string,
        secondElementId: string,
        removeMode = false,
        addMode = false,
        secondPlace = false
    ): void | boolean {
        const firstElement = this.getElementRef(firstElementId);
        const secondElement = this.getElementRef(secondElementId);

        const newLeaderLine = new LeaderLine(firstElement, secondElement, this.leaderLineOptions);
        if (!removeMode && !addMode && !secondPlace) {
            this.leaderLineLinks.push({
                id: firstElementId,
                leaderLineObj: newLeaderLine,
                interact: {first: firstElementId, second: secondElementId},
            });
            return false;
        }
        if (removeMode) {
            const insertPlace = this.getLeaderIndexById(firstElementId);
            this.leaderLineLinks.splice(insertPlace, 0, {
                id: firstElementId,
                leaderLineObj: newLeaderLine,
                interact: {first: firstElementId, second: secondElementId},
            });
            return false;
        }
        if (addMode) {
            const insertPlace = this.getLeaderIndexById(firstElementId);
            this.leaderLineLinks.splice(insertPlace + 1, 0, {
                id: firstElementId,
                leaderLineObj: newLeaderLine,
                interact: {first: firstElementId, second: secondElementId},
            });
            return false;
        }
        if (secondPlace) {
            const insertPlace = this.getLeaderIndexById(secondElementId);
            this.leaderLineLinks.splice(insertPlace, 0, {
                id: firstElementId,
                leaderLineObj: newLeaderLine,
                interact: {first: firstElementId, second: secondElementId},
            });
            return false;
        }
    }

    public ngOnDestroy(): void {
        this.leaderLineLinks.forEach((ln) => ln.leaderLineObj.remove());
        this.leaderLineLinks = [];
    }
}
