import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';



@NgModule({
  declarations: [
    SearchFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SearchFilterModule { }
