import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CalendarEventComponent } from './list/calendar-event.component';
import { CalendarEventDetailComponent } from './detail/calendar-event-detail.component';
import { CalendarEventUpdateComponent } from './update/calendar-event-update.component';
import CalendarEventResolve from './route/calendar-event-routing-resolve.service';

const calendarEventRoute: Routes = [
  {
    path: '',
    component: CalendarEventComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CalendarEventDetailComponent,
    resolve: {
      calendarEvent: CalendarEventResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CalendarEventUpdateComponent,
    resolve: {
      calendarEvent: CalendarEventResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CalendarEventUpdateComponent,
    resolve: {
      calendarEvent: CalendarEventResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default calendarEventRoute;
