import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasetInventoryComponent} from './dataset-inventory.component';
import {SearchFilterModule} from '../../pipes/search-filter/search-filter.module';
import {SearchBoxModule} from '../../components/search-box/search-box.module';
import {SvgModule} from '../../components/svg/svg.module';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';
import {DatasetItemModalComponent} from './components/dataset-item-modal/dataset-item-modal.component';

@NgModule({
    declarations: [DatasetInventoryComponent, DatasetItemModalComponent],
    imports: [CommonModule, SearchFilterModule, SearchBoxModule, SvgModule, ConvertDateModule],
})
export class DatasetInventoryModule {}
