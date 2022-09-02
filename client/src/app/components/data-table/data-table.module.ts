import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {JsonIfJsonModule} from '../../pipes/json-if-json/json-if-json.module';

@NgModule({
    declarations: [DataTableComponent],
    imports: [CommonModule, JsonIfJsonModule],
    exports: [DataTableComponent],
})
export class DataTableModule {}
