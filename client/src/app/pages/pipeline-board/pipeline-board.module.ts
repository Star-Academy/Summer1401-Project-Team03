import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineBoardComponent} from './pipeline-board.component';
import {PipelineNodeComponent} from './components/pipeline-node/pipeline-node.component';
import {NgxDraggabillyModule} from 'ngx-draggabilly';
import {SvgModule} from '../../components/svg/svg.module';
import {AngularDraggableModule} from 'angular2-draggable';
import {BoardComponent} from './components/board/board.component';

@NgModule({
    declarations: [PipelineBoardComponent, PipelineNodeComponent, BoardComponent],
    imports: [CommonModule, NgxDraggabillyModule, SvgModule, AngularDraggableModule],
    exports: [
        PipelineBoardComponent
    ]
})
export class PipelineBoardModule {}
