import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasetComponent} from './dataset.component';
import {TextInputModule} from '../../components/text-input/text-input.module';
import {DataTableModule} from '../../components/data-table/data-table.module';

@NgModule({
    declarations: [DatasetComponent],
    imports: [CommonModule, TextInputModule, DataTableModule],
})
export class DatasetModule {}
