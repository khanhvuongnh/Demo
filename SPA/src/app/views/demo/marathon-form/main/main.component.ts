import { Component, OnInit } from '@angular/core';
import { Sortable } from 'src/app/_core/directives/sortable.directive';
import { Pagination } from 'src/app/_core/helpers/utilities/pagination-utility';
import { Marathon_Form } from 'src/app/_core/models/marathon-form.model';
import { MarathonFormService } from '../../../../_core/services/marathon-form.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  forms: Marathon_Form[] = [];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  }
  sort: Sortable = <Sortable>{};

  constructor(private marathonFormService: MarathonFormService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.marathonFormService.getAllForms(this.pagination, this.sort).subscribe({
      next: (res) => {
        this.forms = res.result;
        this.pagination = res.pagination;
      },
      error: (err) => console.log(err)
    })
  }

  onSort(sort: Sortable) {
    this.sort = sort;
    this.getData();
  }

  pageChanged(e: any) {
    this.pagination.pageNumber = e.page;
    this.getData();
  }
}
