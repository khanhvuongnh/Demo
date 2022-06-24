import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination, PaginationResult } from '../helpers/utilities/pagination-utility';
import { Observable } from 'rxjs';
import { Marathon_Form } from '../models/marathon-form.model';
import { environment } from '../../../environments/environment';
import { OperationResult } from '../helpers/utilities/operation-result';
import { Sortable } from '../directives/sortable.directive';

@Injectable({ providedIn: 'root' })
export class MarathonFormService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllForms(pagination: Pagination, sort: Sortable): Observable<PaginationResult<Marathon_Form>> {
    let params = new HttpParams().appendAll({ ...pagination, ...sort });
    return this.http.get<PaginationResult<Marathon_Form>>(this.apiUrl + 'MarathonForm/All', { params });
  }

  getForm(record_ID: number) {
    return this.http.get<Marathon_Form>(this.apiUrl + 'MarathonForm/', { params: { record_ID } });
  }

  createForm(form: Marathon_Form) {
    let _from = { ...form };
    _from.from_Time = (<Date>_from.from_Time).toStringTime();
    _from.to_Time = (<Date>_from.to_Time).toStringTime();
    _from.date_Of_Birth = (<Date>_from.date_Of_Birth).toUTCDate().toJSON();
    return this.http.post<OperationResult>(this.apiUrl + 'MarathonForm/', _from);
  }

  updateForm(form: Marathon_Form) {
    let _from = { ...form };
    _from.from_Time = (<Date>_from.from_Time).toStringTime();
    _from.to_Time = (<Date>_from.to_Time).toStringTime();
    _from.date_Of_Birth = (<Date>_from.date_Of_Birth).toUTCDate().toJSON();
    return this.http.put<OperationResult>(this.apiUrl + 'MarathonForm/', _from);
  }
}