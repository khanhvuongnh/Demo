import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarathonFormService } from '@services/marathon-form.service';
import { Sortable, SortType } from 'src/app/_core/directives/sortable.directive';
import { Pagination } from '@utilities/pagination-utility';
import { Marathon_Form } from 'src/app/_core/models/marathon-form.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  forms: Marathon_Form[] = [];
  pagination: Pagination = <Pagination>{ pageNumber: 1, pageSize: 10 }
  sort: Sortable = <Sortable>{ sortColumn: '', sortType: SortType.NONE };

  constructor(
    private marathonFormService: MarathonFormService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pagination = this.route.snapshot.data['res'].pagination;
    this.forms = this.route.snapshot.data['res'].result;
  }

  getData(): void {
    this.marathonFormService.getAllForms(this.pagination, this.sort).subscribe({
      next: (res) => {
        this.forms = res.result;
        this.pagination = res.pagination;
      },
      error: (err) => {
        console.log(err);
      }
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
