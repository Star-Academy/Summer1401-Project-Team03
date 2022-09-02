import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineComponent} from './pipeline.component';
import {SvgModule} from '../../components/svg/svg.module';
import {RunButtonComponent} from './components/run-button/run-button.component';
import {LoadingButtonModule} from '../../components/loading-button/loading-button.module';

import {addNodeComponent} from './components/pipeline-board/components/add-node/add-node.component';

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
import {RemoveNodeComponent} from './components/pipeline-board/components/remove-node/remove-node.component';
import {BottomBarComponent} from './components/bottom-bar/bottom-bar.component';
import {PillMenuInputModule} from '../../components/pill-menu-input/pill-menu-input.module';
import {DataTableModule} from 'src/app/components/data-table/data-table.module';
import { AddNodeReplicateComponent } from './components/pipeline-board/components/add-node/components/add-node-replicate/add-node-replicate.component';

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
        BottomBarComponent,
        AddNodeReplicateComponent,
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
        PillMenuInputModule,
        DataTableModule,
    ],
})
export class PipelineModule {}
