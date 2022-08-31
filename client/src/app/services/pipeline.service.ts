import {Injectable} from '@angular/core';
import {NewPipeline} from '../models/NewPipeline.interface';
import {PipelineItemModel} from '../models/pipeline/pipeline-item.model';
import {PIPELINE_ALL, PIPELINE_CREATE, PIPELINE_DELETE} from '../utils/api.utils';
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

        const response = await this.apiService.post<number>(url.toString());

        return response ?? null;
    }

    public async getAllPiplelines(): Promise<void> {
        const response = await this.apiService.get<PipelineItemModel[]>(PIPELINE_ALL);

        this.pipelines = response || [];
    }

    public async deletePipeline(pipelineId: number): Promise<void> {
        const response = await this.apiService.delete(PIPELINE_DELETE, {pipelineId});
        if (response) {
            this.pipelines = this.pipelines.filter((pipeline) => pipeline.id !== pipelineId);
        }
        // TODO: add functionality

    }
}
