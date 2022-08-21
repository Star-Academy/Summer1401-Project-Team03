import {Component, ViewChild} from '@angular/core';
import {ModalComponent} from 'src/app/components/modal/modal.component';

@Component({
    selector: 'app-import-button',
    templateUrl: './import-button.component.html',
    styleUrls: ['./import-button.component.scss'],
})
export class ImportButtonComponent {
    @ViewChild('importModal') public modal!: ModalComponent;

    public handleUpload(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        console.log(files);
    }

    public handleSubmit(): void {}
}
