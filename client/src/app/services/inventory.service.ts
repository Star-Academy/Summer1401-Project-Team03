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

    public async uploadDataSet(file: File): Promise<boolean> {
        const data = new FormData();
        data.append('file', file);
        data.append('type', file.name.endsWith('csv') ? 'text/csv' : 'application/json');

        const response = await this.apiService.formPost<boolean>(INVENTORY_IMPORT, data);

        return !!response;
    }

    public async deleteDataset(id: string): Promise<void> {}
}
