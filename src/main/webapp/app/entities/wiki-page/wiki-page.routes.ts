import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { WikiPageComponent } from './list/wiki-page.component';
import { WikiPageDetailComponent } from './detail/wiki-page-detail.component';
import { WikiPageUpdateComponent } from './update/wiki-page-update.component';
import WikiPageResolve from './route/wiki-page-routing-resolve.service';

const wikiPageRoute: Routes = [
  {
    path: '',
    component: WikiPageComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WikiPageDetailComponent,
    resolve: {
      wikiPage: WikiPageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WikiPageUpdateComponent,
    resolve: {
      wikiPage: WikiPageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WikiPageUpdateComponent,
    resolve: {
      wikiPage: WikiPageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default wikiPageRoute;
