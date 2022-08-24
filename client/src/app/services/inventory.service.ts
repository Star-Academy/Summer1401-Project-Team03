import {Injectable} from '@angular/core';
import {INVENTORY_IMPORT} from '../utils/api.utils';
import {ApiService} from './api.service';
import {DatasetItemModel} from 'src/app/models/dataset/dataset-item.model';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public dataset: DatasetItemModel[] = [];

    public constructor(private apiService: ApiService) {}

    public async uploadDataSet(file: File): Promise<void> {
        const data = new FormData();
        data.append('file', file);

        const response = await this.apiService.formPost<string>(INVENTORY_IMPORT, data);

        if (response) {
            this.dataset.push({
                id: parseInt(response),
                name: file.name,
                fileType: file.type,
                size: file.size.toString(),
                createAt: new Date(),
                modifiedAt: new Date(),
                openedSettingModal: false,
            });
        }
    }

    public async deleteDataset(id: string): Promise<void> {}
}
