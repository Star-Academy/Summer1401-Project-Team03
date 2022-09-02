import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PillMenuInputComponent} from './pill-menu-input.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [PillMenuInputComponent],
    imports: [CommonModule, FormsModule],
    exports: [PillMenuInputComponent],
})
export class PillMenuInputModule {}
