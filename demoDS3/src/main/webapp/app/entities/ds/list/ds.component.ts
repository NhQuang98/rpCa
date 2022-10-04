import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';

import { IDS } from '../ds.model';
import { ASC, DESC, SORT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, DSService } from '../service/ds.service';
import { SortService } from 'app/shared/sort/sort.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-ds',
  templateUrl: './ds.component.html',
})
export class DSComponent implements OnInit {
  dS?: IDS[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  constructor(
    protected dSService: DSService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService
  ) {}

  trackId = (_index: number, item: IDS): number => this.dSService.getDSIdentifier(item);

  ngOnInit(): void {
    this.getAll();
  }

  getAll = () => {
    this.dSService.getAll().subscribe((data: any) => {
      this.dS = data;
      console.log(this.dS);
    });
  };

  delStudent = (id: number) => {
    this.dSService.delStudent(id).subscribe((data: any) => {
      // @ts-ignore'
      Swal.fire('Delete?', 'delete', 'success');
      alert(data);
      this.dS = this.dS?.filter((item: IDS) => {
        return item.id != id;
      });
    });
  };

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.dS = this.refineData(dataFromBody);
  }

  protected refineData(data: IDS[]): IDS[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IDS[] | null): IDS[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.dSService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
