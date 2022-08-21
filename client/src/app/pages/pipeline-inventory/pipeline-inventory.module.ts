import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineInventoryComponent} from './pipeline-inventory.component';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';
import {SvgModule} from "../../components/svg/svg.module";
import {SearchBoxModule} from "../../components/search-box/search-box.module";

@NgModule({
    declarations: [PipelineInventoryComponent],
    imports: [CommonModule, ConvertDateModule, SvgModule, SearchBoxModule],
})
export class PipelineInventoryModule {}
