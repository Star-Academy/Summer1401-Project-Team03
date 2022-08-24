import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineBoardComponent} from './pipeline-board.component';
import {PipelineNodeComponent} from './components/pipeline-node/pipeline-node.component';
import {NgxDraggabillyModule} from 'ngx-draggabilly';
import {SvgModule} from '../../components/svg/svg.module';
import {AngularDraggableModule} from 'angular2-draggable';
import {BoardComponent} from './components/board/board.component';
import {ModalModule} from '../../components/modal/modal.module';
import {ButtonModule} from '../../components/button/button.module';
import { SettingItemModalComponent } from './components/setting-item-modal/setting-item-modal.component';

@NgModule({
    declarations: [PipelineBoardComponent, PipelineNodeComponent, BoardComponent, SettingItemModalComponent],
    imports: [CommonModule, NgxDraggabillyModule, SvgModule, AngularDraggableModule, ModalModule, ButtonModule],
    exports: [PipelineBoardComponent],
})
export class PipelineBoardModule {}
