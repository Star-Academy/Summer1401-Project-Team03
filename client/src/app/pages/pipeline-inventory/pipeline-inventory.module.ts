import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineInventoryComponent} from './pipeline-inventory.component';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';
import {SvgModule} from "../../components/svg/svg.module";
import {SearchBoxModule} from "../../components/search-box/search-box.module";
import {SearchFilterModule} from "../../pipes/search-filter/search-filter.module";
import { ItemModalComponent } from './components/item-modal/item-modal.component';

@NgModule({
    declarations: [PipelineInventoryComponent, ItemModalComponent],
    imports: [CommonModule, ConvertDateModule, SvgModule, SearchBoxModule, SearchFilterModule],
})
export class PipelineInventoryModule {}
