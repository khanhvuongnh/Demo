import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { Marathon_Form } from 'src/app/_core/models/marathon-form.model';
import { MarathonFormService } from 'src/app/_core/services/marathon-form.service';
import { NgSnotifyService } from '../../../../_core/services/ng-snotify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: Marathon_Form = <Marathon_Form>{};
  constructor(
    private marathonFormService: MarathonFormService,
    private route: ActivatedRoute,
    private snotifyService: NgSnotifyService,
    private router: Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.route.snapshot.data['res'];
  }

  async save() {
    await firstValueFrom(this.marathonFormService.updateForm(this.form)
      .pipe(
        tap((res) => {
          this.spinnerService.hide();
          if (res.isSuccess) {
            this.snotifyService.success('Updated Successfully!', 'Success');
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
      ))
  }

  back() {
    this.router.navigate(['/demo/marathon-form']);
  }
}
