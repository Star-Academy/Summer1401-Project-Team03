import {Component, Input} from '@angular/core';
import {TableColumn} from '../../../../components/data-table/models/table-column.model';
import {IoType} from './enums/io-type.enum';
import {DatalistOption} from '../../../../models/DatalistOption.interface';
import {sampleColumns, sampleRows} from '../../../../data/fake-data/table-sample-data.data';
import {PipelineBoardService} from '../../../../services/pipeline-board.service';
import {PROCESS} from 'src/app/data/Processes.data';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent {
    public get processTitle(): string | undefined {
        return this.boardService.selectedNode?.title;
    }

    public get inputColumns(): TableColumn[] | null {
        return this.boardService.nodePreview.inputColumns;
    }
    public get inputRows(): string[][] | null {
        return this.boardService.nodePreview.inputRows;
    }

    public get outputColumns(): TableColumn[] | null {
        return this.boardService.nodePreview.outputColumns;
    }
    public get outputRows(): string[][] | null {
        return this.boardService.nodePreview.outputRows;
    }

    public get isSourceOrDestination(): boolean {
        return (
            [
                PROCESS.json_extractor.id,
                PROCESS.json_loader.id,
                PROCESS.csv_extractor.id,
                PROCESS.csv_loader.id,
            ].indexOf(this.boardService.selectedNode?.processesInfoType || -1) !== -1
        );
    }

    public constructor(public boardService: PipelineBoardService) {}

    public get ioTypeValues(): DatalistOption[] {
        return Object.entries(IoType).map(([value, title]) => ({title, value}));
    }

    public get whichSide(): IoType {
        return this.boardService.nodePreview.ioType;
    }

    public setWhichSide(newValue: string): void {
        const shouldRerun = this.boardService.nodePreview.ioType !== IoType.BOTH;
        switch (newValue) {
            case 'INPUT':
                this.boardService.nodePreview.ioType = IoType.INPUT;
                break;
            case 'OUTPUT':
                this.boardService.nodePreview.ioType = IoType.OUTPUT;
                break;
            case 'BOTH':
                this.boardService.nodePreview.ioType = IoType.BOTH;
                break;
            default:
                throw new Error(newValue);
        }
        if (shouldRerun && this.boardService.selectedNode) this.boardService.runUpToNode();
    }
}
