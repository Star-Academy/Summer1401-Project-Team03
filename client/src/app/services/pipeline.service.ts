import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public constructor(private apiService: ApiService) {}

    public async createPipeline(name: string): Promise<string> {}

    public async deletePipeline(id: string): Promise<void> {}

    public async getPipeline(id: string): Promise<void> {}
}
