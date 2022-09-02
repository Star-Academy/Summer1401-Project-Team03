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
import {SizeModule} from 'src/app/pipes/size/size.module';
import {RenameModalModule} from '../../components/rename-modal/rename-modal.module';
import {EmptyComponent} from '../../components/empty/empty.component';
import {EmptyModule} from '../../components/empty/empty.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [DatasetInventoryComponent, DatasetItemModalComponent, ImportButtonComponent],
    imports: [
        CommonModule,
        RouterModule,
        SearchFilterModule,
        SearchBoxModule,
        SvgModule,
        ConvertDateModule,
        ButtonModule,
        ModalModule,
        ButtonModule,
        SizeModule,
        RenameModalModule,
        EmptyModule,
    ],
})
export class DatasetInventoryModule {}
