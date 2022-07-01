import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarathonFormRoutingModule } from './marathon-form-routing.module';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AddComponent } from './add/add.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SortableDirective } from 'src/app/_core/directives/sortable.directive';
import { MarathonFormResolver } from '@resolvers/marathon-form.resolver';
import { MarathonFormEditResolver } from '@resolvers/marathon-form-edit.resolver';

@NgModule({
  imports: [
    CommonModule,
    MarathonFormRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    SortableDirective
  ],
  exports: [],
  declarations: [
    MainComponent,
    EditComponent,
    AddComponent
  ],
  providers: [
    MarathonFormResolver,
    MarathonFormEditResolver
  ],
})
export class MarathonFormModule { }
