import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineBoardComponent} from './pipeline-board.component';
import {PipelineNodeComponent} from './components/pipeline-node/pipeline-node.component';
import {NgxDraggabillyModule} from 'ngx-draggabilly';
import {SvgModule} from '../../components/svg/svg.module';
import {AngularDraggableModule} from 'angular2-draggable';
import {ProcessListComponent} from './components/process-list/process-list.component';
import {ModalModule} from 'src/app/components/modal/modal.module';
import {ButtonModule} from 'src/app/components/button/button.module';

@NgModule({
    declarations: [PipelineBoardComponent, PipelineNodeComponent, ProcessListComponent],
    imports: [CommonModule, NgxDraggabillyModule, SvgModule, AngularDraggableModule, ModalModule, ButtonModule],
})
export class PipelineBoardModule {}
