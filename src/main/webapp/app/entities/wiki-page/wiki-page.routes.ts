import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import WikiPageResolve from './route/wiki-page-routing-resolve.service';

const wikiPageRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/wiki-page.component').then(m => m.WikiPageComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/wiki-page-detail.component').then(m => m.WikiPageDetailComponent),
    resolve: {
      wikiPage: WikiPageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/wiki-page-update.component').then(m => m.WikiPageUpdateComponent),
    resolve: {
      wikiPage: WikiPageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/wiki-page-update.component').then(m => m.WikiPageUpdateComponent),
    resolve: {
      wikiPage: WikiPageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default wikiPageRoute;
