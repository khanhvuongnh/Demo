import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarathonFormEditResolver } from '@resolvers/marathon-form-edit.resolver';
import { MarathonFormResolver } from '@resolvers/marathon-form.resolver';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    resolve: { res: MarathonFormResolver },
    component: MainComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:record_ID',
    resolve: { res: MarathonFormEditResolver },
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarathonFormRoutingModule { }