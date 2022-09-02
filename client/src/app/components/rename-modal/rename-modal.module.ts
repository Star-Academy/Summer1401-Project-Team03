import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenameModalComponent} from './rename-modal.component';
import {ModalModule} from '../modal/modal.module';
import {ButtonModule} from '../button/button.module';
import {TextInputModule} from '../text-input/text-input.module';

@NgModule({
    declarations: [RenameModalComponent],
    exports: [RenameModalComponent],
    imports: [CommonModule, ModalModule, ButtonModule, TextInputModule],
})
export class RenameModalModule {}
