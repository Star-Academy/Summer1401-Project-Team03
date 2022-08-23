import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasetInventoryComponent} from './dataset-inventory.component';
import {SearchFilterModule} from '../../pipes/search-filter/search-filter.module';
import {SearchBoxModule} from '../../components/search-box/search-box.module';
import {SvgModule} from '../../components/svg/svg.module';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';
import {DatasetItemModalComponent} from './components/dataset-item-modal/dataset-item-modal.component';
import {ImportButtonComponent} from './components/import-button/import-button.component';
import {ButtonModule} from '../../components/button/button.module';
import {ModalModule} from '../../components/modal/modal.module';

@NgModule({
    declarations: [DatasetInventoryComponent, DatasetItemModalComponent, ImportButtonComponent],
    imports: [
        CommonModule,
        SearchFilterModule,
        SearchBoxModule,
        SvgModule,
        ConvertDateModule,
        ButtonModule,
        ModalModule,
    ],
})
export class DatasetInventoryModule {}
