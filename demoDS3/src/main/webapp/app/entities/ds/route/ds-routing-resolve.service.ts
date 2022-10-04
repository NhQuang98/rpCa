import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDS } from '../ds.model';
import { DSService } from '../service/ds.service';

@Injectable({ providedIn: 'root' })
export class DSRoutingResolveService implements Resolve<IDS | null> {
  constructor(protected service: DSService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDS | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dS: HttpResponse<IDS>) => {
          if (dS.body) {
            return of(dS.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
