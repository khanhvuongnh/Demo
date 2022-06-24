import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marathon_Form } from 'src/app/_core/models/marathon-form.model';
import { MarathonFormService } from 'src/app/_core/services/marathon-form.service';
import { NgSnotifyService } from 'src/app/_core/services/ng-snotify.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form: Marathon_Form = <Marathon_Form>{ gender: true };
  constructor(
    private marathonFormService: MarathonFormService,
    private snotifyService: NgSnotifyService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  save() {
    this.marathonFormService.createForm(this.form).subscribe({
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
