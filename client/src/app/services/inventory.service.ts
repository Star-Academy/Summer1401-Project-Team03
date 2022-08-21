import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public constructor(private apiService: ApiService) {}

    public uploadDataSet(file: File): void {
        const type = file.type;
    }

    public downloadDataset(id: string): void {}
}
