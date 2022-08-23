import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {BoardComponent} from './components/board/board.component';
import {SvgModule} from '../../components/svg/svg.module';
import {RunButtonComponent} from './components/run-button/run-button.component';

@NgModule({
    declarations: [PipelineComponent, BoardComponent, RunButtonComponent],
    imports: [CommonModule, SvgModule],
})
export class PipelineModule {}
