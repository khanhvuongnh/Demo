import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Marathon_Form } from '@models/marathon-form.model';
import { MarathonFormService } from '@services/marathon-form.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarathonFormEditResolver implements Resolve<Marathon_Form> {
  constructor(private marathonFormService: MarathonFormService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Marathon_Form> | Promise<Marathon_Form> | Marathon_Form {
    const record_ID: number = route.params['record_ID'];
    return this.marathonFormService.getForm(record_ID);
  }
}