import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sortable } from "@directives/sortable.directive";
import { environment } from "@environments/environment";
import { Marathon_Form } from "@models/marathon-form.model";
import { Pagination, PaginationResult } from "@utilities/pagination-utility";
import { Observable, tap } from "rxjs";
import { OperationResult } from '@utilities/operation-result';


@Injectable({ providedIn: 'root' })
export class MarathonFormService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllForms(pagination: Pagination, sort: Sortable): Observable<PaginationResult<Marathon_Form>> {
    let params = new HttpParams().appendAll({ ...pagination, ...sort });
    return this.http.get<PaginationResult<Marathon_Form>>(this.apiUrl + 'MarathonForm/All', { params });
  }

  getForm(record_ID: number) {
    return this.http.get<Marathon_Form>(this.apiUrl + 'MarathonForm/', { params: { record_ID } })
      .pipe(
        tap(res => {
          res.from_Time = res.from_Time.toString().toDateFromTime();
          res.to_Time = res.to_Time.toString().toDateFromTime();
          res.date_Of_Birth = res.date_Of_Birth.toDate();
        }));
  }

  createForm(form: Marathon_Form) {
    let body = { ...form };
    body.from_Time = (<Date>body.from_Time).toStringTime();
    body.to_Time = (<Date>body.to_Time).toStringTime();
    body.date_Of_Birth = (<Date>body.date_Of_Birth).toUTCDate().toJSON();
    return this.http.post<OperationResult>(this.apiUrl + 'MarathonForm/', body);
  }

  updateForm(form: Marathon_Form) {
    let body = { ...form };
    body.from_Time = (<Date>body.from_Time).toStringTime();
    body.to_Time = (<Date>body.to_Time).toStringTime();
    body.date_Of_Birth = (<Date>body.date_Of_Birth).toUTCDate().toJSON();
    return this.http.put<OperationResult>(this.apiUrl + 'MarathonForm/', body);
  }
}