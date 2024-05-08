import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const openWeatherApiHost = req.url.includes('/air_pollution');

  let url = '';
  let apiKey = '';

  if (openWeatherApiHost) {
    url = environment.openWeatherApiHost;
    apiKey = environment.openWeatherApiKey;
  } else {
    url = environment.apiHost;
    apiKey = environment.apiKey;
  }

  const modifyReq = req.clone({
    url: req.url.replace('', url),
    setParams: {
      apikey: apiKey,
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
