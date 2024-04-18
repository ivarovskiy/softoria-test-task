import { CanActivateFn } from '@angular/router';

export const favoriteGuard: CanActivateFn = (route, state) => {
  return true;
};
