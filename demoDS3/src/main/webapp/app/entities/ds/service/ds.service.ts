import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDS, NewDS } from '../ds.model';

export type PartialUpdateDS = Partial<IDS> & Pick<IDS, 'id'>;

export type EntityResponseType = HttpResponse<IDS>;
export type EntityArrayResponseType = HttpResponse<IDS[]>;

@Injectable({ providedIn: 'root' })
export class DSService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getAll = (): Observable<IDS[]> => {
    return this.http.get<IDS[]>(this.resourceUrl + 'get-all-list-student');
  };

  creStudent = (ds: any): Observable<IDS> => {
    return this.http.post<IDS>(this.resourceUrl + 'create-student', ds);
  };
  updateStudent = (ds: any, id: number): Observable<IDS> => {
    return this.http.put<IDS>(this.resourceUrl + 'update-student/' + id, ds);
  };
  delStudent = (id: number): Observable<any> => {
    // @ts-ignore
    return this.http.post<any>(this.resourceUrl + 'delete-student-by-id/' + id);
  };

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDS>(`${this.resourceUrl}` + id, { observe: 'response' });
  }

  findById(id: number): Observable<IDS> {
    return this.http.get<IDS>(this.resourceUrl + '/' + id);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDS[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getDSIdentifier(dS: Pick<IDS, 'id'>): number {
    return <number>dS.id;
  }

  compareDS(o1: Pick<IDS, 'id'> | null, o2: Pick<IDS, 'id'> | null): boolean {
    return o1 && o2 ? this.getDSIdentifier(o1) === this.getDSIdentifier(o2) : o1 === o2;
  }

  addDSToCollectionIfMissing<Type extends Pick<IDS, 'id'>>(dSCollection: Type[], ...dSToCheck: (Type | null | undefined)[]): Type[] {
    const dS: Type[] = dSToCheck.filter(isPresent);
    if (dS.length > 0) {
      const dSCollectionIdentifiers = dSCollection.map(dSItem => this.getDSIdentifier(dSItem)!);
      const dSToAdd = dS.filter(dSItem => {
        const dSIdentifier = this.getDSIdentifier(dSItem);
        if (dSCollectionIdentifiers.includes(dSIdentifier)) {
          return false;
        }
        dSCollectionIdentifiers.push(dSIdentifier);
        return true;
      });
      return [...dSToAdd, ...dSCollection];
    }
    return dSCollection;
  }
}
