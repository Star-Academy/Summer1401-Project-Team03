import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NewPipeline} from '../models/NewPipeline.interface';
import {PipelineItemModel} from '../models/pipeline/pipeline-item.model';
import {PIPELINE_ALL, PIPELINE_CREATE, PIPELINE_DELETE} from '../utils/api.utils';
import {ApiService} from './api.service';
import {SnackbarService} from './snackbar.service';
import {SnackbarObject} from '../components/snackbar/models/snackbar-object.model';
import {SnackbarTheme} from '../components/snackbar/enums/snackbar-theme';

@Injectable({
    providedIn: 'root',
})
export class PipelineService {
    public pipelines: PipelineItemModel[] = [];
    public constructor(
        private apiService: ApiService,
        private router: Router,
        private snackbarService: SnackbarService
    ) {
        this.getAllPiplelines();
        this.subscribeRoute();
    }

    public async createPipeline(data: NewPipeline): Promise<number | null> {
        const url = new URL(PIPELINE_CREATE);
        Object.keys(data).forEach((key) => url.searchParams.append(key, data[key as keyof NewPipeline]));

        const response = await this.apiService.post<number>(url.toString());

        if (response)
            this.snackbarService.showNewId(new SnackbarObject('Pipeline created successfully', SnackbarTheme.SUCCESS));
        else {
            // todo snack error
        }

        return response;
    }

    public async getAllPiplelines(): Promise<void> {
        const response = await this.apiService.get<PipelineItemModel[]>(PIPELINE_ALL);

        this.pipelines = response || [];
    }

    public async deletePipeline(pipelineId: number): Promise<void> {
        const response = await this.apiService.delete(PIPELINE_DELETE, {pipelineId});
        if (response) {
            this.snackbarService.showNewId(new SnackbarObject('Pipeline deleted successfully', SnackbarTheme.SUCCESS));
            this.pipelines = this.pipelines.filter((pipeline) => pipeline.id !== pipelineId);
        } else {
            // todo snack error
        }
        // TODO: add functionality
    }

    private subscribeRoute(): void {
        this.router.events.subscribe(async (value) => {
            if (value instanceof NavigationEnd) {
                if (value.url.startsWith('/pipeline-inventory')) await this.getAllPiplelines();
            }
        });
    }
}
