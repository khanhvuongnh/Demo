import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[sortable]',
  standalone: true
})
export class SortableDirective implements OnInit {
  @Output('sort') sort: EventEmitter<Sortable> = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const children: HTMLCollection = this.el.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      const sortItem: Element = children.item(i);
      const column: string = sortItem.getAttribute('sort-item');

      if (column) {
        const title: string = sortItem.textContent;
        const group: HTMLDivElement = document.createElement('div');
        group.innerHTML = `
          <b sort-column="${column}" sort-type="${SortType.NONE}" class="d-inline-block mr-auto">${title}</b> 
          <i sort-column="${column}" sort-type="${SortType.NONE}" class="${SortClass.NONE}"></i>`;
        group.setAttribute('style',
          `background-color: transparent; border: none; width: 100%; color: white; 
          display: flex; text-align: left; align-items: center;`);
        group.setAttribute('class', 'btn p-0');
        group.setAttribute('sort-column', column);
        group.setAttribute('sort-type', SortType.NONE);
        group.onclick = this.onSortClick;
        sortItem.innerHTML = null;
        sortItem.appendChild(group);
      }
    }
  }

  onSortClick = (e: any) => {
    let sortClass: string = '';
    let sortColumn: string = e.target.attributes['sort-column'].textContent;
    let sortType: string = e.target.attributes['sort-type'].textContent;

    switch (sortType) {
      case SortType.NONE:
        sortType = SortType.ASC;
        sortClass = SortClass.ASC;
        break;

      case SortType.ASC:
        sortType = SortType.DESC;
        sortClass = SortClass.DESC;
        break;

      case SortType.DESC:
        sortType = SortType.NONE;
        sortClass = SortClass.NONE;
        break;

      default:
        sortType = SortType.NONE;
        sortClass = SortClass.NONE;
        break;
    }

    const allElements: NodeListOf<Element> = document.querySelectorAll('[sort-column]');
    allElements.forEach(x => {
      x.setAttribute('sort-type', SortType.NONE);
      if (x.tagName === 'I') {
        x.setAttribute('class', SortClass.NONE)
      }
    });

    const currentElements: NodeListOf<Element> = document.querySelectorAll(`[sort-column=${sortColumn}]`);
    currentElements.forEach(x => {
      x.setAttribute('sort-type', sortType);
      if (x.tagName === 'I') {
        x.setAttribute('class', sortClass)
      }
    });

    this.sort.emit(<Sortable>{ sortColumn, sortType });
  }
}

export interface Sortable {
  sortColumn: string;
  sortType: SortType;
};

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = ''
};

export enum SortClass {
  ASC = 'fa fa-sort-asc ml-1',
  DESC = 'fa fa-sort-desc ml-1',
  NONE = 'fa fa-sort ml-1'
}
