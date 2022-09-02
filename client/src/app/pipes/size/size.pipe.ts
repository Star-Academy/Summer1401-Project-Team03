import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'size',
})
export class SizePipe implements PipeTransform {
    public KB = Math.pow(1024, 1);
    public MB = Math.pow(1024, 2);
    public GB = Math.pow(1024, 3);

    public transform(size: string): string {
        const sizeNum = Number(size);
        if (sizeNum < this.KB) return `${sizeNum.toFixed(1)}B`;
        if (sizeNum < this.MB) return `${(sizeNum / this.KB).toFixed(1)}KB`;
        if (sizeNum < this.GB) return `${(sizeNum / this.MB).toFixed(1)}MB`;
        return `${(sizeNum / this.GB).toFixed(1)}GB`;
    }
}
