import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pagenator } from '../models/pagenator.model';

export interface PagingConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
@Injectable({
  providedIn: 'root',
})
export class PagenatorService {
  pagenator$ = new BehaviorSubject<Pagenator>({
    length: 1,
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    totalPages: 0,
    pageSizeOptions: [5, 10, 15, 20],
  });

  constructor() { }

  pagenateChange(event: any) {
    if (event) {
      if (
        (this.pagenator$.getValue().pageIndex < event.pageIndex ||
          this.pagenator$.getValue().pageSize != event.pageSize) &&
        this.pagenator$.getValue().length /
        this.pagenator$.getValue().pageSize !=
        event.pageIndex + 1
      ) {
        this.pagenator$.next({
          ...event,
          pageSizeOptions: this.pagenator$.getValue().pageSizeOptions,
        });
        return true;
      }
      this.pagenator$.next({
        ...event,
        pageSizeOptions: this.pagenator$.getValue().pageSizeOptions,
      });
    }
    return false;
  }

  updatePagenatorLenth(length: number) {
    this.pagenator$.next({
      ...this.pagenator$.getValue(),
      length: length,
    });
  }
  updatePagenatorTotalPages(total: number) {
    this.pagenator$.next({
      ...this.pagenator$.getValue(),
      totalPages: total,
    });
  }

  resetPagenator() {
    setTimeout(() => {
      this.pagenator$.next({
        length: 1,
        pageIndex: 0,
        pageSize: this.pagenator$.getValue().pageSize,
        previousPageIndex: 0,
        totalPages: 0,
        pageSizeOptions: this.pagenator$.getValue().pageSizeOptions,
      });
    }, 100);
  }
}
