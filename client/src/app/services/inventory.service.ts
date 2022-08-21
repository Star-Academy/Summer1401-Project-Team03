import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    public constructor(private apiService: ApiService) {}

    public async uploadDataSet(file: File): Promise<void> {
        const response = this.apiService.post('http://localhost:3000/', file, {
            headers: {
                'content-type': file.type,
            },
        });
    }

    public async downloadDataset(id: string): Promise<void> {}
}
