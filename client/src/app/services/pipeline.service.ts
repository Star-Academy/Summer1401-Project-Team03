import {Injectable} from '@angular/core';
import {NewPipeline} from '../models/NewPipeline.interface';
import { PipelineItemModel } from '../models/pipeline/pipeline-item.model';
import {PIPELINE_CREATE} from '../utils/api.utils';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {

    public pipelines: PipelineItemModel[] = [];
    public constructor(private apiService: ApiService) {}

    public async createPipeline(data: NewPipeline): Promise<string> {
        const url = new URL(PIPELINE_CREATE);
        Object.keys(data).forEach((key) => url.searchParams.append(key, data[key as keyof NewPipeline]));

        const response = await this.apiService.post<string>(url.toString(), {});

        return response ?? '';
    }

    public async deletePipeline(id: string): Promise<void> {}

    public async getPipeline(id: string): Promise<void> {
        const response = await this.apiService.get<
    }
}
