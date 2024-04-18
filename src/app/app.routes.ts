import { Routes } from '@angular/router';
import { favoriteGuard } from './core/guards/favorite.guard';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        c => c.FavoritesComponent
      ),
    canActivate: [favoriteGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
