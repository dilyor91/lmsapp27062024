import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAttendance } from 'app/entities/attendance/attendance.model';
import { AttendanceService } from 'app/entities/attendance/service/attendance.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { AttendanceEnum } from 'app/entities/enumerations/attendance-enum.model';
import { AttendanceDetailService } from '../service/attendance-detail.service';
import { IAttendanceDetail } from '../attendance-detail.model';
import { AttendanceDetailFormService, AttendanceDetailFormGroup } from './attendance-detail-form.service';

@Component({
  standalone: true,
  selector: 'jhi-attendance-detail-update',
  templateUrl: './attendance-detail-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AttendanceDetailUpdateComponent implements OnInit {
  isSaving = false;
  attendanceDetail: IAttendanceDetail | null = null;
  attendanceEnumValues = Object.keys(AttendanceEnum);

  attendancesSharedCollection: IAttendance[] = [];
  usersSharedCollection: IUser[] = [];

  protected attendanceDetailService = inject(AttendanceDetailService);
  protected attendanceDetailFormService = inject(AttendanceDetailFormService);
  protected attendanceService = inject(AttendanceService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AttendanceDetailFormGroup = this.attendanceDetailFormService.createAttendanceDetailFormGroup();

  compareAttendance = (o1: IAttendance | null, o2: IAttendance | null): boolean => this.attendanceService.compareAttendance(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attendanceDetail }) => {
      this.attendanceDetail = attendanceDetail;
      if (attendanceDetail) {
        this.updateForm(attendanceDetail);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attendanceDetail = this.attendanceDetailFormService.getAttendanceDetail(this.editForm);
    if (attendanceDetail.id !== null) {
      this.subscribeToSaveResponse(this.attendanceDetailService.update(attendanceDetail));
    } else {
      this.subscribeToSaveResponse(this.attendanceDetailService.create(attendanceDetail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttendanceDetail>>): void {
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

  protected updateForm(attendanceDetail: IAttendanceDetail): void {
    this.attendanceDetail = attendanceDetail;
    this.attendanceDetailFormService.resetForm(this.editForm, attendanceDetail);

    this.attendancesSharedCollection = this.attendanceService.addAttendanceToCollectionIfMissing<IAttendance>(
      this.attendancesSharedCollection,
      attendanceDetail.attendance,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, attendanceDetail.student);
  }

  protected loadRelationshipsOptions(): void {
    this.attendanceService
      .query()
      .pipe(map((res: HttpResponse<IAttendance[]>) => res.body ?? []))
      .pipe(
        map((attendances: IAttendance[]) =>
          this.attendanceService.addAttendanceToCollectionIfMissing<IAttendance>(attendances, this.attendanceDetail?.attendance),
        ),
      )
      .subscribe((attendances: IAttendance[]) => (this.attendancesSharedCollection = attendances));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.attendanceDetail?.student)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
