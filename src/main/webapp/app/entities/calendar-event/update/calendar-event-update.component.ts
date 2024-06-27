import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { EventFrequency } from 'app/entities/enumerations/event-frequency.model';
import { CalendarEventService } from '../service/calendar-event.service';
import { ICalendarEvent } from '../calendar-event.model';
import { CalendarEventFormService, CalendarEventFormGroup } from './calendar-event-form.service';

@Component({
  standalone: true,
  selector: 'jhi-calendar-event-update',
  templateUrl: './calendar-event-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CalendarEventUpdateComponent implements OnInit {
  isSaving = false;
  calendarEvent: ICalendarEvent | null = null;
  eventFrequencyValues = Object.keys(EventFrequency);

  usersSharedCollection: IUser[] = [];

  protected calendarEventService = inject(CalendarEventService);
  protected calendarEventFormService = inject(CalendarEventFormService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CalendarEventFormGroup = this.calendarEventFormService.createCalendarEventFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calendarEvent }) => {
      this.calendarEvent = calendarEvent;
      if (calendarEvent) {
        this.updateForm(calendarEvent);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const calendarEvent = this.calendarEventFormService.getCalendarEvent(this.editForm);
    if (calendarEvent.id !== null) {
      this.subscribeToSaveResponse(this.calendarEventService.update(calendarEvent));
    } else {
      this.subscribeToSaveResponse(this.calendarEventService.create(calendarEvent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalendarEvent>>): void {
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

  protected updateForm(calendarEvent: ICalendarEvent): void {
    this.calendarEvent = calendarEvent;
    this.calendarEventFormService.resetForm(this.editForm, calendarEvent);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, calendarEvent.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.calendarEvent?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
