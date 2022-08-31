import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'jsonIfJson',
})
export class JsonIfJsonPipe implements PipeTransform {
    public transform(value: any): any {
        if (typeof value === 'object') return Object.keys(value).length ? JSON.stringify(value) : '';
        return value;
    }
}
