import {Injectable} from '@angular/core';
import {INVENTORY_ALL, INVENTORY_DELETE, INVENTORY_IMPORT} from '../utils/api.utils';
import {ApiService} from './api.service';
import {DatasetItemModel} from 'src/app/models/dataset/dataset-item.model';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public dataset: DatasetItemModel[] = [];

    public constructor(private apiService: ApiService) {}

    public async getAllDataset(): Promise<void> {
        const response = await this.apiService.get<DatasetItemModel[]>(INVENTORY_ALL);
        this.dataset = response ?? [];
    }

    public async uploadDataSet(file: File): Promise<void> {
        const data = new FormData();
        data.append('file', file);

        const response = await this.apiService.formPost<string>(INVENTORY_IMPORT, data);

        if (response) {
            this.dataset.push({
                id: response,
                length: file.size.toString(),
                name: file.name,
                type: file.type,
                category: 'imports',
                createTime: new Date(),
                openedSettingModal: false,
            });
        }
    }

    public async deleteDataset(id: string, category: string): Promise<void> {
        const url = new URL(INVENTORY_DELETE);
        url.searchParams.append('fileId', id);
        url.searchParams.append('category', category);
        const response = await this.apiService.delete(url.toString());
        if (response) {
            this.dataset = this.dataset.filter((data) => data.id !== id);
        }
    }
}
