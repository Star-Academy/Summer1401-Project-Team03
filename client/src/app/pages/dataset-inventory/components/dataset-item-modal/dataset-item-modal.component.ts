import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatasetItemModel} from 'src/app/models/dataset/dataset-item.model';
import {INVENTORY_EXPORT} from 'src/app/utils/api.utils';

@Component({
    selector: 'app-dataset-item-modal',
    templateUrl: './dataset-item-modal.component.html',
    styleUrls: ['./dataset-item-modal.component.scss'],
})
export class DatasetItemModalComponent implements OnInit {
    @Input() public dataset: DatasetItemModel = {
        id: 0,
        name: '',
        createTime: new Date(),
        openedSettingModal: false,
        type: '',
        length: '',
        category: 'imports',
    };
    @Output() public renameEmit = new EventEmitter<void>();
    @Output() public downloadEmit = new EventEmitter<void>();
    @Output() public deleteEmit = new EventEmitter<void>();

    public downloadLink: string = '';

    public ngOnInit(): void {
        const url = new URL(INVENTORY_EXPORT);
        url.searchParams.append('fileId', this.dataset.id.toString());
        url.searchParams.append('category', this.dataset.category);
        this.downloadLink = url.toString();
    }
}
