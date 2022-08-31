import {ItemType} from '../enums/ItemType.enum';
import {DatalistOption} from './DatalistOption.interface';

export interface Paramether {
    label: string;
    type: ItemType;
    options?: DatalistOption[];
    text_type?: 'text' | 'number' | 'password';
    value: any;
}
