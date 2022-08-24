import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {SvgModule} from '../../components/svg/svg.module';
import {RunButtonComponent} from './components/run-button/run-button.component';
import {LoadingButtonModule} from '../../components/loading-button/loading-button.module';
import {PipelineBoardModule} from '../pipeline-board/pipeline-board.module';

@NgModule({
    declarations: [PipelineComponent, RunButtonComponent],
    imports: [CommonModule, SvgModule, LoadingButtonModule, PipelineBoardModule],
})
export class PipelineModule {}
