import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'size',
})
export class SizePipe implements PipeTransform {
    public transform(size: string): string {
        const sizeValue = parseFloat(size);
        const mbsize = Math.round((sizeValue / 2048) * 100) / 100;
        return mbsize + 'Mb';
    }
}
