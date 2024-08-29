import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CalendarTodoResolve from './route/calendar-todo-routing-resolve.service';

const calendarTodoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/calendar-todo.component').then(m => m.CalendarTodoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/calendar-todo-detail.component').then(m => m.CalendarTodoDetailComponent),
    resolve: {
      calendarTodo: CalendarTodoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/calendar-todo-update.component').then(m => m.CalendarTodoUpdateComponent),
    resolve: {
      calendarTodo: CalendarTodoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/calendar-todo-update.component').then(m => m.CalendarTodoUpdateComponent),
    resolve: {
      calendarTodo: CalendarTodoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default calendarTodoRoute;
