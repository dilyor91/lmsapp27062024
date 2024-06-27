import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudyAcademicYear } from 'app/entities/study-academic-year/study-academic-year.model';
import { StudyAcademicYearService } from 'app/entities/study-academic-year/service/study-academic-year.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { SpecialityService } from 'app/entities/speciality/service/speciality.service';
import { IGroup } from 'app/entities/group/group.model';
import { GroupService } from 'app/entities/group/service/group.service';
import { TutionTypeEnum } from 'app/entities/enumerations/tution-type-enum.model';
import { EducationLanguage } from 'app/entities/enumerations/education-language.model';
import { EducationType } from 'app/entities/enumerations/education-type.model';
import { EducationForm } from 'app/entities/enumerations/education-form.model';
import { StudentService } from '../service/student.service';
import { IStudent } from '../student.model';
import { StudentFormService, StudentFormGroup } from './student-form.service';

@Component({
  standalone: true,
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudentUpdateComponent implements OnInit {
  isSaving = false;
  student: IStudent | null = null;
  tutionTypeEnumValues = Object.keys(TutionTypeEnum);
  educationLanguageValues = Object.keys(EducationLanguage);
  educationTypeValues = Object.keys(EducationType);
  educationFormValues = Object.keys(EducationForm);

  studyAcademicYearsCollection: IStudyAcademicYear[] = [];
  usersSharedCollection: IUser[] = [];
  facultiesSharedCollection: IFaculty[] = [];
  specialitiesSharedCollection: ISpeciality[] = [];
  groupsSharedCollection: IGroup[] = [];

  protected studentService = inject(StudentService);
  protected studentFormService = inject(StudentFormService);
  protected studyAcademicYearService = inject(StudyAcademicYearService);
  protected userService = inject(UserService);
  protected facultyService = inject(FacultyService);
  protected specialityService = inject(SpecialityService);
  protected groupService = inject(GroupService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudentFormGroup = this.studentFormService.createStudentFormGroup();

  compareStudyAcademicYear = (o1: IStudyAcademicYear | null, o2: IStudyAcademicYear | null): boolean =>
    this.studyAcademicYearService.compareStudyAcademicYear(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareFaculty = (o1: IFaculty | null, o2: IFaculty | null): boolean => this.facultyService.compareFaculty(o1, o2);

  compareSpeciality = (o1: ISpeciality | null, o2: ISpeciality | null): boolean => this.specialityService.compareSpeciality(o1, o2);

  compareGroup = (o1: IGroup | null, o2: IGroup | null): boolean => this.groupService.compareGroup(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.student = student;
      if (student) {
        this.updateForm(student);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.studentFormService.getStudent(this.editForm);
    if (student.id !== null) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
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

  protected updateForm(student: IStudent): void {
    this.student = student;
    this.studentFormService.resetForm(this.editForm, student);

    this.studyAcademicYearsCollection = this.studyAcademicYearService.addStudyAcademicYearToCollectionIfMissing<IStudyAcademicYear>(
      this.studyAcademicYearsCollection,
      student.studyAcademicYear,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, student.user);
    this.facultiesSharedCollection = this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(
      this.facultiesSharedCollection,
      student.faculty,
    );
    this.specialitiesSharedCollection = this.specialityService.addSpecialityToCollectionIfMissing<ISpeciality>(
      this.specialitiesSharedCollection,
      student.speciality,
    );
    this.groupsSharedCollection = this.groupService.addGroupToCollectionIfMissing<IGroup>(this.groupsSharedCollection, student.group);
  }

  protected loadRelationshipsOptions(): void {
    this.studyAcademicYearService
      .query({ filter: 'student-is-null' })
      .pipe(map((res: HttpResponse<IStudyAcademicYear[]>) => res.body ?? []))
      .pipe(
        map((studyAcademicYears: IStudyAcademicYear[]) =>
          this.studyAcademicYearService.addStudyAcademicYearToCollectionIfMissing<IStudyAcademicYear>(
            studyAcademicYears,
            this.student?.studyAcademicYear,
          ),
        ),
      )
      .subscribe((studyAcademicYears: IStudyAcademicYear[]) => (this.studyAcademicYearsCollection = studyAcademicYears));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.student?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.facultyService
      .query()
      .pipe(map((res: HttpResponse<IFaculty[]>) => res.body ?? []))
      .pipe(map((faculties: IFaculty[]) => this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(faculties, this.student?.faculty)))
      .subscribe((faculties: IFaculty[]) => (this.facultiesSharedCollection = faculties));

    this.specialityService
      .query()
      .pipe(map((res: HttpResponse<ISpeciality[]>) => res.body ?? []))
      .pipe(
        map((specialities: ISpeciality[]) =>
          this.specialityService.addSpecialityToCollectionIfMissing<ISpeciality>(specialities, this.student?.speciality),
        ),
      )
      .subscribe((specialities: ISpeciality[]) => (this.specialitiesSharedCollection = specialities));

    this.groupService
      .query()
      .pipe(map((res: HttpResponse<IGroup[]>) => res.body ?? []))
      .pipe(map((groups: IGroup[]) => this.groupService.addGroupToCollectionIfMissing<IGroup>(groups, this.student?.group)))
      .subscribe((groups: IGroup[]) => (this.groupsSharedCollection = groups));
  }
}
