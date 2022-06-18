import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarathonFormRoutingModule } from './marathon-form-routing.module';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

@NgModule({
  imports: [
    CommonModule,
    MarathonFormRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports: [],
  declarations: [
    MainComponent,
    EditComponent
  ],
  providers: [],
})
export class MarathonFormModule { }
