import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';
import {PROCESS, ProcessSchema} from 'src/app/data/Processes.data';

@Component({
    selector: 'app-process-list',
    templateUrl: './process-list.component.html',
    styleUrls: ['./process-list.component.scss'],
})
export class ProcessListComponent {
    @ViewChild('processAdd') public modal!: ModalComponent;
    public processes: ProcessSchema[] = Object.values(PROCESS);
}
