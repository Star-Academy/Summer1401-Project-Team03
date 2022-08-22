import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'convertDate',
})
export class ConvertDatePipe implements PipeTransform {
    public transform(date: Date): string {
        return date.toLocaleString('en-Za', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
            second: '2-digit',
        });
    }
}
