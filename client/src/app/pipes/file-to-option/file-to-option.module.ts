import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileToOptionPipe} from './file-to-option.pipe';

@NgModule({
    declarations: [FileToOptionPipe],
    exports: [FileToOptionPipe],
    imports: [CommonModule],
})
export class FileToOptionModule {}
