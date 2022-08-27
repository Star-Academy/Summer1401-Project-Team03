import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {SvgModule} from '../../components/svg/svg.module';
import {RunButtonComponent} from './components/run-button/run-button.component';
import {LoadingButtonModule} from '../../components/loading-button/loading-button.module';

import {ProcessListComponent} from './components/process-list/process-list.component';

import {ButtonModule} from 'src/app/components/button/button.module';
import {ModalModule} from 'src/app/components/modal/modal.module';

import {PipelineNodeComponent} from './components/pipeline-node/pipeline-node.component';
import {PipelineBoardComponent} from './components/pipeline-board/pipeline-board.component';
import {SettingItemModalComponent} from './components/setting-item-modal/setting-item-modal.component';
import {BoardComponent} from './components/board/board.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {NgxDraggabillyModule} from 'ngx-draggabilly';

@NgModule({
    declarations: [
        PipelineComponent,
        RunButtonComponent,
        ProcessListComponent,
        PipelineNodeComponent,
        PipelineBoardComponent,
        SettingItemModalComponent,
        BoardComponent,
    ],

    imports: [
        CommonModule,
        SvgModule,
        LoadingButtonModule,
        ButtonModule,
        ModalModule,
        NgxDraggabillyModule,
        AngularDraggableModule,
    ],
})
export class PipelineModule {}
