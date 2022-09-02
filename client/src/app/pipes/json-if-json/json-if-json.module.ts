import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JsonIfJsonPipe} from './json-if-json.pipe';

@NgModule({
    declarations: [JsonIfJsonPipe],
    exports: [JsonIfJsonPipe],
    imports: [CommonModule],
})
export class JsonIfJsonModule {}
