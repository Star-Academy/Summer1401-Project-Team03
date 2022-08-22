import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {BoardComponent} from './components/board/board.component';

@NgModule({
    declarations: [PipelineComponent, BoardComponent],
    imports: [CommonModule],
})
export class PipelineModule {}
