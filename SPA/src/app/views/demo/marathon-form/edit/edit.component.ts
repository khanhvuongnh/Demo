import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marathon_Form } from 'src/app/_core/models/marathon-form.model';
import { MarathonFormService } from 'src/app/_core/services/marathon-form.service';
import { NgSnotifyService } from '../../../../_core/services/ng-snotify.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  record_ID: number = null;
  form: Marathon_Form = <Marathon_Form>{};
  constructor(
    private marathonFormService: MarathonFormService,
    private route: ActivatedRoute,
    private snotifyService: NgSnotifyService,
    private router: Router) {
    this.record_ID = +this.route.snapshot.params['record_ID'];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.marathonFormService.getForm(this.record_ID).subscribe({
      next: (res) => {
        this.form = res;
        this.form.date_Of_Birth = this.form.date_Of_Birth.toDate();
        console.log(this.form.date_Of_Birth.toStringDateFormat('dd-yyyy-mm'));

        this.form.from_Time = (<string>this.form.from_Time).toDateFromTime();
        this.form.to_Time = (<string>this.form.to_Time).toDateFromTime();
        console.log(res);
      },
      error: (err) => console.log(err)
    })
  }

  save() {
    console.log(this.form);
    this.marathonFormService.updateForm(this.form).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.snotifyService.success('Updated Successfully!', 'Success');
          this.back();
        } else {
          this.snotifyService.error('Error!', 'Error');
        }
      },
      error: (err) => console.log(err)
    })
  }

  back() {
    this.router.navigate(['/demo/marathon-form']);
  }
}
