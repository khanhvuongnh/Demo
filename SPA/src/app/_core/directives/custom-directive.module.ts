import { NgModule } from '@angular/core';
import { SortableDirective } from './sortable.directive';

@NgModule({
  declarations: [
    SortableDirective
  ],
  exports: [
    SortableDirective
  ]
})
export class CustomDirectiveModule { }
