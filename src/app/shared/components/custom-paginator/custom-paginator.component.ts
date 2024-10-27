import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { PagenatorService } from '../../services/pagenator.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.scss'
})
export class CustomPaginatorComponent {

  paginator$: any;
  dir$: any;
  pagesList: any = []
  previousPageIndex = 0
  @Input() length: number = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 0;
  @Input() totalPages: number = 0;
  @Input() pageSizeOptions: any[];
  @Output() page = new EventEmitter<any>();

  constructor(
    private languageService: LanguageService,
    private pagenatorService: PagenatorService,
  ) {
    this.paginator$ = this.pagenatorService.pagenator$;
    this.dir$ = this.languageService.dir$;
    this.pageSizeOptions = this.paginator$.getValue().pageSizeOptions;
  }

  ngOnInit() {
    this.getPagesList();
    // this.paginator$.asObservable()
    // .pipe(
    //   tap((res) => {
    //     this.getPagesList();
    // }))
  }

  getPagesList() {
    if (this.totalPages > 1) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pagesList.push(i);
      }
    } else {
      this.pagesList = [1];
    }
  }

  rowsChange(rows: any) {
    this.pageSize = rows
    //reset page index
    this.pageIndex = 0
    let page = {
      length: this.length,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      previousPageIndex: this.previousPageIndex
    }
    this.page.emit(page)
  }

  pageChange(next: any) {
    this.previousPageIndex = this.pageIndex
    this.pageIndex = next ? this.pageIndex + 1 : this.pageIndex - 1
    let page = {
      length: this.length,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      previousPageIndex: this.previousPageIndex
    }
    this.page.emit(page)
  }

  goToPage(pageNo: any) {
    let body = {
      length: this.length,
      pageIndex: pageNo - 1,
      pageSize: this.pageSize,
      previousPageIndex: this.previousPageIndex
    }
    this.page.emit(body)
  }
}
