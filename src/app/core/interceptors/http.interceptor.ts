import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const modifyReq = req.clone({
    url: environment.apiHost,
    setParams: {
      apikey: environment.apiKey,
    },
  });

  return next(modifyReq).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        console.log(
          'Request had bad syntax or the parameters supplied were invalid.'
        );
      }
      console.error(e.message);
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
