import {Injectable} from '@angular/core';
import {POST_INIT, FORM_POST_INIT} from '../utils/api.utils';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public constructor() {}

    private async fetchData<T>(url: string, init: Partial<RequestInit> = {}): Promise<T | null> {
        let response = await fetch(url, init);
        let data = await response.json();

        if (response.ok) {
            return data as T;
        }

        return null;
    }

    public async post<T>(url: string, body: any = '', init: Partial<RequestInit> = {}): Promise<T | null> {
        return await this.fetchData(url, {...POST_INIT, body: JSON.stringify(body), ...init});
    }

    public async formPost<T>(url: string, body: any = '', init: Partial<RequestInit> = {}): Promise<T | null> {
        return await this.fetchData(url, {...FORM_POST_INIT, body: body, ...init});
    }

    public async get<T>(url: string, init: Partial<RequestInit> = {}): Promise<T | null> {
        return await this.fetchData(url, init);
    }
}
