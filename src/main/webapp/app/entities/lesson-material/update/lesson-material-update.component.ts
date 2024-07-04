import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { LessonFileTypeEnum } from 'app/entities/enumerations/lesson-file-type-enum.model';
import { LessonMaterialService } from '../service/lesson-material.service';
import { ILessonMaterial } from '../lesson-material.model';
import { LessonMaterialFormService, LessonMaterialFormGroup } from './lesson-material-form.service';

@Component({
  standalone: true,
  selector: 'jhi-lesson-material-update',
  templateUrl: './lesson-material-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LessonMaterialUpdateComponent implements OnInit {
  isSaving = false;
  lessonMaterial: ILessonMaterial | null = null;
  lessonFileTypeEnumValues = Object.keys(LessonFileTypeEnum);

  attachmentsCollection: IAttachment[] = [];
  lessonsSharedCollection: ILesson[] = [];

  protected lessonMaterialService = inject(LessonMaterialService);
  protected lessonMaterialFormService = inject(LessonMaterialFormService);
  protected attachmentService = inject(AttachmentService);
  protected lessonService = inject(LessonService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LessonMaterialFormGroup = this.lessonMaterialFormService.createLessonMaterialFormGroup();

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  compareLesson = (o1: ILesson | null, o2: ILesson | null): boolean => this.lessonService.compareLesson(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lessonMaterial }) => {
      this.lessonMaterial = lessonMaterial;
      if (lessonMaterial) {
        this.updateForm(lessonMaterial);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lessonMaterial = this.lessonMaterialFormService.getLessonMaterial(this.editForm);
    if (lessonMaterial.id !== null) {
      this.subscribeToSaveResponse(this.lessonMaterialService.update(lessonMaterial));
    } else {
      this.subscribeToSaveResponse(this.lessonMaterialService.create(lessonMaterial));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILessonMaterial>>): void {
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

  protected updateForm(lessonMaterial: ILessonMaterial): void {
    this.lessonMaterial = lessonMaterial;
    this.lessonMaterialFormService.resetForm(this.editForm, lessonMaterial);

    this.attachmentsCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsCollection,
      lessonMaterial.attachment,
    );
    this.lessonsSharedCollection = this.lessonService.addLessonToCollectionIfMissing<ILesson>(
      this.lessonsSharedCollection,
      lessonMaterial.lesson,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.attachmentService
      .query({ filter: 'lessonmaterial-is-null' })
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.lessonMaterial?.attachment),
        ),
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsCollection = attachments));

    this.lessonService
      .query()
      .pipe(map((res: HttpResponse<ILesson[]>) => res.body ?? []))
      .pipe(map((lessons: ILesson[]) => this.lessonService.addLessonToCollectionIfMissing<ILesson>(lessons, this.lessonMaterial?.lesson)))
      .subscribe((lessons: ILesson[]) => (this.lessonsSharedCollection = lessons));
  }
}
