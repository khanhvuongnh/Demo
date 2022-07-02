import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marathon_Form } from 'src/app/_core/models/marathon-form.model';
import { MarathonFormService } from 'src/app/_core/services/marathon-form.service';
import { NgSnotifyService } from 'src/app/_core/services/ng-snotify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, firstValueFrom, of, tap } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: Marathon_Form = <Marathon_Form>{ gender: true };
  backupForm: Marathon_Form = <Marathon_Form>{ gender: true };

  constructor(
    private marathonFormService: MarathonFormService,
    private snotifyService: NgSnotifyService,
    private spinnerService: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  async save() {
    this.spinnerService.show();
    await firstValueFrom(this.marathonFormService.createForm(this.form)
      .pipe(
        tap((res) => {
          this.spinnerService.hide();
          if (res.isSuccess) {
            this.snotifyService.success('Added Successfully!', 'Success');
            this.back();
          } else {
            this.snotifyService.error('Error!', 'Error');
          }
        }),
        catchError((err) => {
          this.spinnerService.hide();
          console.log(err);
          return of(null);
        })
      ));
  }

  back() {
    this.router.navigate(['/demo/marathon-form']);
  }

  reset() {
    this.form = { ...this.backupForm };
  }
}
