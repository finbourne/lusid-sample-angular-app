import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioSearchResult, SearchService } from '@finbourne/lusid-sdk-angular8';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListComponent {

  dataSource: Observable<DataState>;
  displayedColumns: string[] = ['scope', 'code', 'displayName', 'type', 'baseCurrency', 'isDerived'];

  private reloadSubject = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private searchService: SearchService
  ) {
    this.dataSource = this.getDataSource();
  }

  reload(): void {
    this.reloadSubject.next();
  }

  search(val: string): void {
    this.searchSubject.next(val);
  }

  private getDataSource(): Observable<DataState> {
    return this.reloadSubject.pipe(
      startWith(null),
      switchMap(() => this.searchSubject.pipe(
        debounceTime(500),
        startWith('')
      )),
      switchMap(search => this.searchPortfolios(search).pipe(
        map(data => ({ data })),
        catchError(() => of({ isError: true })),
        startWith({ isLoading: true }),
      )),
      shareReplay()
    );
  }

  private searchPortfolios(search: string): Observable<PortfolioSearchResult[]> {
    return this.searchService
      .searchPortfolios(search, undefined, undefined, 30)
      .pipe(pluck('values'));
  }

}

interface DataState {
  data?: PortfolioSearchResult[];
  isError?: boolean;
  isLoading?: boolean;
}
