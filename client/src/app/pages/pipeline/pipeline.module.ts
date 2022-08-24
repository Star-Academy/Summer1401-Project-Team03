import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {BoardComponent} from './components/board/board.component';
import {SvgModule} from '../../components/svg/svg.module';
import {RunButtonComponent} from './components/run-button/run-button.component';
import {LoadingButtonModule} from '../../components/loading-button/loading-button.module';
import {ProcessListComponent} from './components/process-list/process-list.component';
import {PipelineNodeComponent} from './components/pipeline-node/pipeline-node.component';
import {ButtonModule} from 'src/app/components/button/button.module';
import {ModalModule} from 'src/app/components/modal/modal.module';

@NgModule({
    declarations: [PipelineComponent, BoardComponent, RunButtonComponent, ProcessListComponent, PipelineNodeComponent],
    imports: [CommonModule, SvgModule, LoadingButtonModule, ButtonModule, ModalModule],
})
export class PipelineModule {}
