import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SizePipe} from './size.pipe';

@NgModule({
    declarations: [SizePipe],
    exports: [SizePipe],
    imports: [CommonModule],
})
export class SizeModule {}
