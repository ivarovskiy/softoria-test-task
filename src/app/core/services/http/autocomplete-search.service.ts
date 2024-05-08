import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiEndPoint } from '@constants/apiEndPoints';
import { ICity } from '@models/city.interface';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteSearchService {
  http = inject(HttpClient);

  getAutocompleteResults(q: string | null): Observable<any> {
    if (q !== null) {
      const params = new HttpParams().set('q', q);

      return this.http.get<ICity>(apiEndPoint.locationAutocomplete, { params });
    }

    return of(false);
  }
}
