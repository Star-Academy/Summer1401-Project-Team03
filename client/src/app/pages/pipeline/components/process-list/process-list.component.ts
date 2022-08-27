import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessInfo, ProcessSchema} from 'src/app/data/Processes.data';
import {ProcessType} from 'src/app/enums/ProcessType.enum';

@Component({
    selector: 'app-process-list',
    templateUrl: './process-list.component.html',
    styleUrls: ['./process-list.component.scss'],
})
export class ProcessListComponent {
    @ViewChild('ProcessAdd') public modal!: ModalComponent;

    public processes: ProcessInfo = PROCESS;

    public addProcess(type: string): void {
        this.modal.closeModal();
    }
}
