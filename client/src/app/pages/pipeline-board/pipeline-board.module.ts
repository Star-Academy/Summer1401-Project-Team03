import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineBoardComponent} from './pipeline-board.component';
import {PipelineNodeComponent} from '../pipeline/components/pipeline-node/pipeline-node.component';
import {NgxDraggabillyModule} from 'ngx-draggabilly';
import {SvgModule} from '../../components/svg/svg.module';
import {AngularDraggableModule} from 'angular2-draggable';

@NgModule({
    declarations: [PipelineBoardComponent, PipelineNodeComponent],
    imports: [CommonModule, NgxDraggabillyModule, SvgModule, AngularDraggableModule],
})
export class PipelineBoardModule {}
