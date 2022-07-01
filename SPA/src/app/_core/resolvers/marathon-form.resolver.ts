import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Sortable, SortType } from '@directives/sortable.directive';
import { Pagination, PaginationResult } from '@utilities/pagination-utility';
import { Marathon_Form } from '@models/marathon-form.model';
import { MarathonFormService } from '@services/marathon-form.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MarathonFormResolver implements Resolve<PaginationResult<Marathon_Form>> {
  pagination: Pagination = <Pagination>{ pageNumber: 1, pageSize: 10 };
  sort: Sortable = { sortColumn: '', sortType: SortType.NONE };

  constructor(private marathonFormService: MarathonFormService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<Marathon_Form>> | Promise<PaginationResult<Marathon_Form>> | PaginationResult<Marathon_Form> {
    return this.marathonFormService.getAllForms(this.pagination, this.sort);
  }
}