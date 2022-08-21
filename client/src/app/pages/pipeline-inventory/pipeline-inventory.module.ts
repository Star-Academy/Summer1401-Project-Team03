import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineInventoryComponent} from './pipeline-inventory.component';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';

@NgModule({
    declarations: [PipelineInventoryComponent],
    imports: [CommonModule, ConvertDateModule],
})
export class PipelineInventoryModule {}
