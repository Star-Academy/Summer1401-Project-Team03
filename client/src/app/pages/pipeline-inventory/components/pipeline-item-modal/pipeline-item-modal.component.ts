import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';

@Component({
    selector: 'app-pipeline-item-modal',
    templateUrl: './pipeline-item-modal.component.html',
    styleUrls: ['./pipeline-item-modal.component.scss'],
})
export class PipelineItemModalComponent {
    @Output() public deleteEmit = new EventEmitter<number>();

    @ViewChild('removePipeModal') public modal!: ModalComponent;

    public id: number | null = null;

    public open(id: number): void {
        this.modal.openModal();
        this.id = id;
    }

    public deleteItem(): void {
        this.modal.closeModal();
        this.id && this.deleteEmit.emit(this.id);
        this.id = null;
    }
}
