import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @ViewChild('Modal') private modal!: ElementRef;

    @Input() public title: string = '';

    @Output() public cancelled = new EventEmitter();

    public openModal(): void {
        const host = this.modal.nativeElement as HTMLDialogElement;
        host.showModal();
    }

    public closeModal(): void {
        const host = this.modal.nativeElement as HTMLDialogElement;
        host.close();
    }

    public cancelModal(): void {
        const host = this.modal.nativeElement as HTMLDialogElement;
        host.close();
        this.cancelled.emit();
    }
}
