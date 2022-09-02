import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineInventoryComponent} from './pipeline-inventory.component';
import {ConvertDateModule} from '../../pipes/convert-date/convert-date.module';
import {SvgModule} from '../../components/svg/svg.module';
import {SearchBoxModule} from '../../components/search-box/search-box.module';
import {SearchFilterModule} from '../../pipes/search-filter/search-filter.module';
import {PipelineItemModalComponent} from './components/pipeline-item-modal/pipeline-item-modal.component';
import {ButtonModule} from 'src/app/components/button/button.module';
import {PipelineAddButtonComponent} from './components/pipeline-add-button/pipeline-add-button.component';
import {ModalModule} from 'src/app/components/modal/modal.module';
import {TextInputModule} from 'src/app/components/text-input/text-input.module';
import {DataListModule} from 'src/app/components/data-list/data-list.module';
import {FileToOptionModule} from '../../pipes/file-to-option/file-to-option.module';
import {RouterModule} from '@angular/router';
import {EmptyModule} from '../../components/empty/empty.module';

@NgModule({
    declarations: [PipelineInventoryComponent, PipelineItemModalComponent, PipelineAddButtonComponent],
    imports: [
        CommonModule,
        RouterModule,
        ConvertDateModule,
        SvgModule,
        SearchBoxModule,
        SearchFilterModule,
        ButtonModule,
        TextInputModule,
        DataListModule,
        ModalModule,
        FileToOptionModule,
        EmptyModule,
    ],
})
export class PipelineInventoryModule {}
