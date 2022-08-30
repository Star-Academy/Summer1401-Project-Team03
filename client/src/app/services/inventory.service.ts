import {Injectable} from '@angular/core';
import {INVENTORY_ALL, INVENTORY_DELETE, INVENTORY_IMPORT} from '../utils/api.utils';
import {ApiService} from './api.service';
import {DatasetItemModel} from 'src/app/models/dataset/dataset-item.model';
import {BehaviorSubject} from 'rxjs';
import {PROCESS} from '../data/Processes.data';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public dataset: DatasetItemModel[] = [];

    public datasetRx = new BehaviorSubject<DatasetItemModel[] | null>(null);

    public constructor(private apiService: ApiService) {
        this.getAllDataset();
        this.subscribeJoinOptions();
    }

    public async getAllDataset(): Promise<void> {
        const response = await this.apiService.get<DatasetItemModel[]>(INVENTORY_ALL);
        this.dataset = response ?? [];
        this.datasetRx.next(this.dataset);
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
            this.datasetRx.next(this.dataset);
        }
    }

    public async deleteDataset(id: string, category: string): Promise<void> {
        const url = new URL(INVENTORY_DELETE);
        url.searchParams.append('fileId', id);
        url.searchParams.append('category', category);
        const response = await this.apiService.delete(url.toString());
        if (response) {
            this.dataset = this.dataset.filter((data) => data.id !== id);
            this.datasetRx.next(this.dataset);
        }
    }

    private subscribeJoinOptions(): void {
        this.datasetRx.subscribe((value) => {
            PROCESS.join.paramethers.datasets.options = value?.map((dataset) => ({
                title: dataset.name,
                value: dataset.id,
            }));
        });
    }
}
