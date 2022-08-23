import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchFilter',
})

export class SearchFilterPipe implements PipeTransform {
    public transform(items: any[], searchPhrase: string): any[] {
        if (!searchPhrase) return items;

        const lowerCasedSearchPhrase = searchPhrase.toLowerCase();
        return items.filter((x) => JSON.stringify(x).toLowerCase().includes(lowerCasedSearchPhrase));
    }
}
