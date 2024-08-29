import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { ICalendarTodo } from '../calendar-todo.model';
import { CalendarTodoService } from '../service/calendar-todo.service';
import { CalendarTodoFormGroup, CalendarTodoFormService } from './calendar-todo-form.service';

@Component({
  standalone: true,
  selector: 'jhi-calendar-todo-update',
  templateUrl: './calendar-todo-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CalendarTodoUpdateComponent implements OnInit {
  isSaving = false;
  calendarTodo: ICalendarTodo | null = null;

  usersSharedCollection: IUser[] = [];

  protected calendarTodoService = inject(CalendarTodoService);
  protected calendarTodoFormService = inject(CalendarTodoFormService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CalendarTodoFormGroup = this.calendarTodoFormService.createCalendarTodoFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calendarTodo }) => {
      this.calendarTodo = calendarTodo;
      if (calendarTodo) {
        this.updateForm(calendarTodo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const calendarTodo = this.calendarTodoFormService.getCalendarTodo(this.editForm);
    if (calendarTodo.id !== null) {
      this.subscribeToSaveResponse(this.calendarTodoService.update(calendarTodo));
    } else {
      this.subscribeToSaveResponse(this.calendarTodoService.create(calendarTodo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalendarTodo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(calendarTodo: ICalendarTodo): void {
    this.calendarTodo = calendarTodo;
    this.calendarTodoFormService.resetForm(this.editForm, calendarTodo);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, calendarTodo.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.calendarTodo?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
