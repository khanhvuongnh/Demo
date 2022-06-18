import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpStatusCode, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageConstants } from '@constants/local-storage.constants';
@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private spinnerService: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get service-side error
          if (error.status === HttpStatusCode.Unauthorized) {
            localStorage.clear();
            localStorage.setItem(LocalStorageConstants.LANG, this.translateService.currentLang);
            this.router.navigate(['/login']);
          }

          errorMessage = error.error;
        }

        this.spinnerService.hide();
        return throwError(() => errorMessage);
      })
    );
  }
}
