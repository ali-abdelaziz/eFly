import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @ViewChild('listFilter') listFilter?: ElementRef;
  @Output() filterInput = new EventEmitter<any>();
  searchForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  _unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Init form
    this.initSearchForm(false);
  }

  initSearchForm(multiSelectOn: boolean) {
    this.searchForm = this._fb.group({
      filter: multiSelectOn ? [{ value: '', disabled: true }] : [''],
      sort: multiSelectOn ? [{ value: '', disabled: true }] : [''],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.listFilter) this.filterInputObservable(this.listFilter);
    }, 500);
  }

  filterInputObservable(input: ElementRef) {
    let filterInput = fromEvent(input.nativeElement, 'keyup')
      .pipe(debounceTime(1000), takeUntil(this._unsubscribe$))
      .subscribe(() => {
        if (
          this.searchForm.get('filter')?.value?.length > 2 ||
          this.searchForm.get('filter')?.value?.length == 0
        ) {
          this.isLoading = true;

          setTimeout(() => {
            this.isLoading = false;
            this.filterInput.emit(this.searchForm.get('filter')?.value);
          }, 700);
        }
      });
  }

}
