import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineBoardComponent} from './pipeline-board.component';
import { PipelineNodeComponent } from './components/pipeline-node/pipeline-node.component';
import {NgxDraggabillyModule} from "ngx-draggabilly";
import {SvgModule} from "../../components/svg/svg.module";

@NgModule({
    declarations: [PipelineBoardComponent, PipelineNodeComponent],
    imports: [CommonModule, NgxDraggabillyModule, SvgModule],
})
export class PipelineBoardModule {}
