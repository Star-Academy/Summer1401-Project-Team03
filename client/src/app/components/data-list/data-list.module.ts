import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataListComponent} from './data-list.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [DataListComponent],
    exports: [DataListComponent],
    imports: [CommonModule, FormsModule],
})
export class DataListModule {}
