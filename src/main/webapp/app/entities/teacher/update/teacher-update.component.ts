import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { IDepartment } from 'app/entities/department/department.model';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { GenderEnum } from 'app/entities/enumerations/gender-enum.model';
import { PositionEnum } from 'app/entities/enumerations/position-enum.model';
import { AcademicDegreeEnum } from 'app/entities/enumerations/academic-degree-enum.model';
import { AcademicTitleEnum } from 'app/entities/enumerations/academic-title-enum.model';
import { TeacherService } from '../service/teacher.service';
import { ITeacher } from '../teacher.model';
import { TeacherFormService, TeacherFormGroup } from './teacher-form.service';

@Component({
  standalone: true,
  selector: 'jhi-teacher-update',
  templateUrl: './teacher-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeacherUpdateComponent implements OnInit {
  isSaving = false;
  teacher: ITeacher | null = null;
  genderEnumValues = Object.keys(GenderEnum);
  positionEnumValues = Object.keys(PositionEnum);
  academicDegreeEnumValues = Object.keys(AcademicDegreeEnum);
  academicTitleEnumValues = Object.keys(AcademicTitleEnum);

  usersSharedCollection: IUser[] = [];
  facultiesSharedCollection: IFaculty[] = [];
  departmentsSharedCollection: IDepartment[] = [];

  protected teacherService = inject(TeacherService);
  protected teacherFormService = inject(TeacherFormService);
  protected userService = inject(UserService);
  protected facultyService = inject(FacultyService);
  protected departmentService = inject(DepartmentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TeacherFormGroup = this.teacherFormService.createTeacherFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareFaculty = (o1: IFaculty | null, o2: IFaculty | null): boolean => this.facultyService.compareFaculty(o1, o2);

  compareDepartment = (o1: IDepartment | null, o2: IDepartment | null): boolean => this.departmentService.compareDepartment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teacher }) => {
      this.teacher = teacher;
      if (teacher) {
        this.updateForm(teacher);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teacher = this.teacherFormService.getTeacher(this.editForm);
    if (teacher.id !== null) {
      this.subscribeToSaveResponse(this.teacherService.update(teacher));
    } else {
      this.subscribeToSaveResponse(this.teacherService.create(teacher));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>): void {
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

  protected updateForm(teacher: ITeacher): void {
    this.teacher = teacher;
    this.teacherFormService.resetForm(this.editForm, teacher);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, teacher.user);
    this.facultiesSharedCollection = this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(
      this.facultiesSharedCollection,
      teacher.faculty,
    );
    this.departmentsSharedCollection = this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(
      this.departmentsSharedCollection,
      teacher.department,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.teacher?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.facultyService
      .query()
      .pipe(map((res: HttpResponse<IFaculty[]>) => res.body ?? []))
      .pipe(map((faculties: IFaculty[]) => this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(faculties, this.teacher?.faculty)))
      .subscribe((faculties: IFaculty[]) => (this.facultiesSharedCollection = faculties));

    this.departmentService
      .query()
      .pipe(map((res: HttpResponse<IDepartment[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartment[]) =>
          this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(departments, this.teacher?.department),
        ),
      )
      .subscribe((departments: IDepartment[]) => (this.departmentsSharedCollection = departments));
  }
}
