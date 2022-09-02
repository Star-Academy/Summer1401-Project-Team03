import {Injectable} from '@angular/core';
import {DATASET_RENAME, DATASET_Sample, INVENTORY_ALL, INVENTORY_DELETE, INVENTORY_IMPORT} from '../utils/api.utils';
import {ApiService} from './api.service';
import {DatasetItemModel, DatasetRenameModel} from 'src/app/models/dataset/dataset-item.model';
import {BehaviorSubject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {SnackbarService} from './snackbar.service';
import {SnackbarObject} from '../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../components/snackbar/enums/snackbar-theme';
import {PROCESS} from '../data/Processes.data';
import {Pair} from '../models/pair.model';
import {TableColumn} from '../components/data-table/models/table-column.model';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public dataset: DatasetItemModel[] = [];

    public datasetRx = new BehaviorSubject<DatasetItemModel[] | null>(null);

    public constructor(
        private apiService: ApiService,
        private router: Router,
        private snackbarService: SnackbarService
    ) {
        this.getAllDataset();
        this.subscribeRoute();
        this.subscribeJoinOptions();
    }

    public async getAllDataset(): Promise<void> {
        const response = await this.apiService.get<DatasetItemModel[]>(INVENTORY_ALL);
        this.dataset = response ?? [];
        this.datasetRx.next(this.dataset);
    }

    public async uploadDataSet(file: File): Promise<boolean> {
        const data = new FormData();
        data.append('file', file);

        const response = await this.apiService.formPost<number>(INVENTORY_IMPORT, data);

        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('Dataset imported successfully', SnackbarTheme.SUCCESS));

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
        } else {
            // todo snack error
        }
        return !!response;
    }

    public async deleteDataset(id: number, category: string): Promise<void> {
        const url = new URL(INVENTORY_DELETE);
        url.searchParams.append('fileId', id.toString());
        url.searchParams.append('category', category);
        const response = await this.apiService.delete(url.toString());
        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('dataset deleted successfully', SnackbarTheme.SUCCESS));
            this.dataset = this.dataset.filter((data) => data.id !== id);
            this.datasetRx.next(this.dataset);
        } else {
            // todo snack error
        }
    }

    public async renameDataset(renameData: DatasetRenameModel): Promise<void> {
        const currentDatasetIndex = this.dataset.findIndex((data) => data.id === renameData.fileId);
        const response = await this.apiService.put(DATASET_RENAME, renameData);
        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('dataset renamed successfully', SnackbarTheme.SUCCESS));
            this.dataset[currentDatasetIndex].name = renameData.newName;
            this.datasetRx.next(this.dataset);
        } else {
            // todo snack error
        }
    }

    public async getSample(fileId: number): Promise<Pair<TableColumn[], string[][]> | null> {
        const response = await this.apiService.get<any[]>(DATASET_Sample, {fileId});

        if (response && response.length > 0) {
            return new Pair<TableColumn[], string[][]>(
                Object.keys(response[0]).map((col) => new TableColumn(col)),
                response.map((row) => Object.values(row as string))
            );
        }
        return null;
    }

    private subscribeJoinOptions(): void {
        this.datasetRx.subscribe((value) => {
            if (!value) {
                return;
            }
            PROCESS.join.parameters.file_id.options = value?.map((dataset) => ({
                title: dataset.name,
                value: dataset.id.toString(),
            }));
        });
    }

    private subscribeRoute(): void {
        this.router.events.subscribe(async (value) => {
            if (value instanceof NavigationEnd) {
                if (value.url.startsWith('/dataset-inventory')) await this.getAllDataset();
            }
        });
    }
}
