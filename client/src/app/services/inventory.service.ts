import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public constructor(private apiService: ApiService) {}

    public async uploadDataSet(file: File): Promise<void> {
        const data = new FormData();
        data.append('file', file);

        const response = this.apiService.formPost('http://localhost:3000/', data);
    }

    public async downloadDataset(id: string): Promise<void> {}
}
