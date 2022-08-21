import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';

@Component({
    selector: 'app-import-button',
    templateUrl: './import-button.component.html',
    styleUrls: ['./import-button.component.scss'],
})
export class ImportButtonComponent {
    @ViewChild('mymodal') public modal!: ModalComponent;
    public file: File | null = null;

    public setFile(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length) {
            this.file = files[0];
        }
    }
}
