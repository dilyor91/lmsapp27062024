import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFaculty } from '../faculty.model';
import { FacultyService } from '../service/faculty.service';
import { FacultyFormService, FacultyFormGroup } from './faculty-form.service';

@Component({
  standalone: true,
  selector: 'jhi-faculty-update',
  templateUrl: './faculty-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FacultyUpdateComponent implements OnInit {
  isSaving = false;
  faculty: IFaculty | null = null;

  protected facultyService = inject(FacultyService);
  protected facultyFormService = inject(FacultyFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: FacultyFormGroup = this.facultyFormService.createFacultyFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ faculty }) => {
      this.faculty = faculty;
      if (faculty) {
        this.updateForm(faculty);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const faculty = this.facultyFormService.getFaculty(this.editForm);
    if (faculty.id !== null) {
      this.subscribeToSaveResponse(this.facultyService.update(faculty));
    } else {
      this.subscribeToSaveResponse(this.facultyService.create(faculty));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFaculty>>): void {
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

  protected updateForm(faculty: IFaculty): void {
    this.faculty = faculty;
    this.facultyFormService.resetForm(this.editForm, faculty);
  }
}
