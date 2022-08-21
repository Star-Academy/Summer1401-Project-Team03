import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBoxComponent} from './search-box.component';
import {FormsModule} from '@angular/forms';
import {SvgModule} from '../svg/svg.module';

@NgModule({
    declarations: [SearchBoxComponent],
    imports: [CommonModule, FormsModule, SvgModule],
    exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
