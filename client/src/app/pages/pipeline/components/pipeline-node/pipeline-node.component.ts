import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PipelineNodeModel} from '../../../../models/pipeline-node.model';
import {PROCESS, ProcessInfo} from '../../../../data/Processes.data';
import {PipelineBoardService} from 'src/app/services/pipeline-board.service';
import {ProcessType} from '../../../../enums/ProcessType.enum';

@Component({
    selector: 'app-pipeline-node',
    templateUrl: './pipeline-node.component.html',
    styleUrls: ['./pipeline-node.component.scss'],
})
export class PipelineNodeComponent implements OnInit {
    public PROCESS = PROCESS;
    public processType!: ProcessType;
    @Input() public pipelineNodeData!: PipelineNodeModel;
    @Output() public removeNodeEmit = new EventEmitter<void>();
    @Output() public addNodeEmit = new EventEmitter<void>();

    public constructor(private boardService: PipelineBoardService) {}

    public ngOnInit(): void {
        const type =
            Object.entries(PROCESS).find((process) => process[1].id === this.pipelineNodeData.processesInfoType) || '';
        this.processType = (<any>ProcessType)[type[0]];
    }

    public toggleShowItemSettingModal(): void {
        this.pipelineNodeData.openedSettingModal = !this.pipelineNodeData.openedSettingModal;
    }

    public configNode(id: number): void {
        this.pipelineNodeData.openedSettingModal = false;
        console.log(`configure node ${id}`);
        // TODO Connect to service
    }
}
