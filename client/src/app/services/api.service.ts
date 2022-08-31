import {Injectable} from '@angular/core';
import {POST_INIT, FORM_POST_INIT, PUT_INIT} from '../utils/api.utils';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public constructor() {}

    private async fetchData<T>(url: string, init: Partial<RequestInit> = {}): Promise<T | null> {
        let response = await fetch(url, init);

        let data = null;

        try {
            data = await response.json();
        } catch {
            if (response.ok) {
                data = true;
            } else {
                data = false;
            }
        }

        if (response.ok) {
            return data as T;
        }

        return null;
    }

    public async post<T>(
        url: string,
        queries: any = {},
        body: any = '',
        init: Partial<RequestInit> = {}
    ): Promise<T | null> {
        const u = new URL(url);
        Object.keys(queries).forEach((key) => u.searchParams.append(key, queries[key]));
        return await this.fetchData(u.toString(), {...POST_INIT, body: JSON.stringify(body), ...init});
    }

    public async put<T>(
        url: string,
        queries: any = {},
        body: any = '',
        init: Partial<RequestInit> = {}
    ): Promise<T | null> {
        const u = new URL(url);
        Object.keys(queries).forEach((key) => u.searchParams.append(key, queries[key]));
        return await this.fetchData(u.toString(), {...PUT_INIT, body: JSON.stringify(body), ...init});
    }

    public async formPost<T>(url: string, body: any = '', init: Partial<RequestInit> = {}): Promise<T | null> {
        return await this.fetchData(url, {...FORM_POST_INIT, body: body, ...init});
    }

    public async get<T>(url: string, queries: any = {}, init: Partial<RequestInit> = {}): Promise<T | null> {
        const u = new URL(url);
        Object.keys(queries).forEach((key) => u.searchParams.append(key, queries[key]));
        return await this.fetchData(u.toString(), init);
    }

    public async delete<T>(url: string, queries: any = {}): Promise<T | null> {
        const u = new URL(url);
        Object.keys(queries).forEach((key) => u.searchParams.append(key, queries[key]));
        return await this.fetchData(u.toString(), {method: 'delete'});
    }
}
