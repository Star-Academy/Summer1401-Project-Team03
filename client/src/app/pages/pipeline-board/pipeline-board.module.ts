import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineBoardComponent} from './pipeline-board.component';
import { PipelineNodeComponent } from './components/pipeline-node/pipeline-node.component';

@NgModule({
    declarations: [PipelineBoardComponent, PipelineNodeComponent],
    imports: [CommonModule],
})
export class PipelineBoardModule {}
