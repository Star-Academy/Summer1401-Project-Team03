import {Injectable} from '@angular/core';
import {NewPipeline} from '../models/NewPipeline.interface';
import {PipelineItemModel} from '../models/pipeline/pipeline-item.model';
import {PIPELINE_ALL, PIPELINE_CREATE} from '../utils/api.utils';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public pipelines: PipelineItemModel[] = [];
    public constructor(private apiService: ApiService) {
        this.getAllPiplelines();
    }

    public async createPipeline(data: NewPipeline): Promise<number | null> {
        const url = new URL(PIPELINE_CREATE);
        Object.keys(data).forEach((key) => url.searchParams.append(key, data[key as keyof NewPipeline]));

        const response = await this.apiService.post<number>(url.toString(), {});
        console.log(response);

        return response ?? null;
    }

    public async getAllPiplelines(): Promise<void> {
        const response = await this.apiService.get<PipelineItemModel[]>(PIPELINE_ALL);

        this.pipelines = response || [];
    }

    public async deletePipeline(id: string): Promise<void> {
        // TODO: add functionality
    }
}
