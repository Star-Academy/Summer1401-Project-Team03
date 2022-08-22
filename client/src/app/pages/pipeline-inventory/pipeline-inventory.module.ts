import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineInventoryComponent} from './pipeline-inventory.component';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';
import {SvgModule} from "../../components/svg/svg.module";
import {SearchBoxModule} from "../../components/search-box/search-box.module";
import {SearchFilterModule} from "../../pipes/search-filter/search-filter.module";
import { PipelineItemModalComponent } from './components/pipeline-item-modal/pipeline-item-modal.component';

@NgModule({
    declarations: [PipelineInventoryComponent, PipelineItemModalComponent],
    imports: [CommonModule, ConvertDateModule, SvgModule, SearchBoxModule, SearchFilterModule],
})
export class PipelineInventoryModule {}
