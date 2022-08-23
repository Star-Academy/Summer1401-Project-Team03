import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @ViewChild('modal') private modal!: ElementRef;

    @Input() public title: string = '';

    @Output() public modalClosed = new EventEmitter();

    public openModal(): void {
        const host = this.modal.nativeElement as HTMLDialogElement;
        host.showModal();
    }

    public closeModal(): void {
        const host = this.modal.nativeElement as HTMLDialogElement;
        host.close();
        this.modalClosed.emit();
    }
}
