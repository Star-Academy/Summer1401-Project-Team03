import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {SvgModule} from '../../components/svg/svg.module';
import {RunButtonComponent} from './components/run-button/run-button.component';
import {LoadingButtonModule} from '../../components/loading-button/loading-button.module';

import {addNodeComponent} from './components/pipeline-node/components/add-node/add-node.component';

import {ButtonModule} from 'src/app/components/button/button.module';
import {ModalModule} from 'src/app/components/modal/modal.module';

import {PipelineNodeComponent} from './components/pipeline-node/pipeline-node.component';
import {PipelineBoardComponent} from './components/pipeline-board/pipeline-board.component';
import {SettingItemModalComponent} from './components/pipeline-node/components/setting-item-modal/setting-item-modal.component';
import {BoardComponent} from './components/board/board.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {NgxDraggabillyModule} from 'ngx-draggabilly';

import {SideBarComponent} from './components/side-bar/side-bar.component';
import {TextInputModule} from 'src/app/components/text-input/text-input.module';
import {SwitchModule} from 'src/app/components/switch/switch.module';
import {DataListModule} from 'src/app/components/data-list/data-list.module';
import {RemoveNodeComponent} from './components/pipeline-node/components/remove-node/remove-node.component';

@NgModule({
    declarations: [
        PipelineComponent,
        RunButtonComponent,
        addNodeComponent,
        PipelineNodeComponent,
        PipelineBoardComponent,
        SettingItemModalComponent,
        BoardComponent,
        RemoveNodeComponent,
        SideBarComponent,
    ],

    imports: [
        CommonModule,
        SvgModule,
        LoadingButtonModule,
        ButtonModule,
        TextInputModule,
        SwitchModule,
        DataListModule,
        ModalModule,
        NgxDraggabillyModule,
        AngularDraggableModule,
        TextInputModule,
    ],
})
export class PipelineModule {}
