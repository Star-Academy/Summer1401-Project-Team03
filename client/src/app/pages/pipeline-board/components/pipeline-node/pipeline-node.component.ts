import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {ModalComponent} from '../../../../components/modal/modal.component';
import {PROCESS} from '../../../../data/Processes.data';

const DUMMY_PIPELINE_NODE: PipelineNodeModel = {
    id: '8',
    title: 'new node',
    processesInfoType: PROCESS.FILTER,
    position: {x: 700, y: 100},
    openedSettingModal: false,
};
let counter = 10;
@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent {
    @Input() public pipelineNodeData!: PipelineNodeModel;
    @Output() public removeNodeEmit = new EventEmitter<void>();
    @Output() public addNodeEmit = new EventEmitter<PipelineNodeModel>();
    @ViewChild('mymodal') public modal!: ModalComponent;

    private mainContainer = this.elRef.nativeElement;

    public constructor(private elRef: ElementRef) {}

    public toggleShowItemSettingModal(): void {
        this.pipelineNodeData.openedSettingModal = !this.pipelineNodeData.openedSettingModal;
    }

    public newNode(id: string): void {
        this.pipelineNodeData.openedSettingModal = false;
        const {x, y} = this.getPosition(id);
        // const newPosition = {x: x + 200, y};
        const newPosition = {x, y};
        const newNodeComponent: PipelineNodeModel = {
            ...DUMMY_PIPELINE_NODE,
            position: newPosition,
            id: counter.toString(),
        };
        counter++; // temporary
        this.addNodeEmit.emit(newNodeComponent);

        console.log(`add new node after ${id}`);
        // TODO Connect to service
    }

    public configNode(id: string): void {
        this.pipelineNodeData.openedSettingModal = false;
        console.log(`configure node ${id}`);
        // TODO Connect to service
    }

    public deleteNode(id: string): void {
        this.pipelineNodeData.openedSettingModal = false;
        console.log(`delete node ${id}`);
        // TODO Connect to service
    }

    private getElementRef(id: string): HTMLElement {
        const nodeComponent = this.mainContainer.parentElement.querySelector(`app-pipeline-node[id="${id}"]`);
        return nodeComponent;
    }

    private getPosition(id: string): {x: number; y: number} {
        const component = this.getElementRef(id);

        // TODO , dont work offsetLeft
        // console.log(component);
        // const position = {x: component?.offsetLeft, y: component?.offsetTop};
        const position = {x: 0, y: 0};
        return position;
    }
}
