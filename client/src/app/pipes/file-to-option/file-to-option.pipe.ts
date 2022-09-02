import {Pipe, PipeTransform} from '@angular/core';
import {DatalistOption} from 'src/app/models/DatalistOption.interface';
import {DatasetItemModel} from 'src/app/models/dataset/dataset-item.model';

@Pipe({
    name: 'fileToOption',
})
export class FileToOptionPipe implements PipeTransform {
    public transform(datasets: DatasetItemModel[]): DatalistOption[] {
        return datasets.map((data) => ({title: data.name, value: data.id.toString()}));
    }
}
