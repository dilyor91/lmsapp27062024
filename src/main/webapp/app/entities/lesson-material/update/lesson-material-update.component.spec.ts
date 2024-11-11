import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { ILessonMaterial } from '../lesson-material.model';
import { LessonMaterialService } from '../service/lesson-material.service';
import { LessonMaterialFormService } from './lesson-material-form.service';

import { LessonMaterialUpdateComponent } from './lesson-material-update.component';

describe('LessonMaterial Management Update Component', () => {
  let comp: LessonMaterialUpdateComponent;
  let fixture: ComponentFixture<LessonMaterialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let lessonMaterialFormService: LessonMaterialFormService;
  let lessonMaterialService: LessonMaterialService;
  let attachmentService: AttachmentService;
  let lessonService: LessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LessonMaterialUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(LessonMaterialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LessonMaterialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    lessonMaterialFormService = TestBed.inject(LessonMaterialFormService);
    lessonMaterialService = TestBed.inject(LessonMaterialService);
    attachmentService = TestBed.inject(AttachmentService);
    lessonService = TestBed.inject(LessonService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call attachment query and add missing value', () => {
      const lessonMaterial: ILessonMaterial = { id: 456 };
      const attachment: IAttachment = { id: 8619 };
      lessonMaterial.attachment = attachment;

      const attachmentCollection: IAttachment[] = [{ id: 19291 }];
      jest.spyOn(attachmentService, 'query').mockReturnValue(of(new HttpResponse({ body: attachmentCollection })));
      const expectedCollection: IAttachment[] = [attachment, ...attachmentCollection];
      jest.spyOn(attachmentService, 'addAttachmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ lessonMaterial });
      comp.ngOnInit();

      expect(attachmentService.query).toHaveBeenCalled();
      expect(attachmentService.addAttachmentToCollectionIfMissing).toHaveBeenCalledWith(attachmentCollection, attachment);
      expect(comp.attachmentsCollection).toEqual(expectedCollection);
    });

    it('Should call Lesson query and add missing value', () => {
      const lessonMaterial: ILessonMaterial = { id: 456 };
      const lesson: ILesson = { id: 31310 };
      lessonMaterial.lesson = lesson;

      const lessonCollection: ILesson[] = [{ id: 26392 }];
      jest.spyOn(lessonService, 'query').mockReturnValue(of(new HttpResponse({ body: lessonCollection })));
      const additionalLessons = [lesson];
      const expectedCollection: ILesson[] = [...additionalLessons, ...lessonCollection];
      jest.spyOn(lessonService, 'addLessonToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ lessonMaterial });
      comp.ngOnInit();

      expect(lessonService.query).toHaveBeenCalled();
      expect(lessonService.addLessonToCollectionIfMissing).toHaveBeenCalledWith(
        lessonCollection,
        ...additionalLessons.map(expect.objectContaining),
      );
      expect(comp.lessonsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const lessonMaterial: ILessonMaterial = { id: 456 };
      const attachment: IAttachment = { id: 24983 };
      lessonMaterial.attachment = attachment;
      const lesson: ILesson = { id: 5284 };
      lessonMaterial.lesson = lesson;

      activatedRoute.data = of({ lessonMaterial });
      comp.ngOnInit();

      expect(comp.attachmentsCollection).toContain(attachment);
      expect(comp.lessonsSharedCollection).toContain(lesson);
      expect(comp.lessonMaterial).toEqual(lessonMaterial);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILessonMaterial>>();
      const lessonMaterial = { id: 123 };
      jest.spyOn(lessonMaterialFormService, 'getLessonMaterial').mockReturnValue(lessonMaterial);
      jest.spyOn(lessonMaterialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lessonMaterial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lessonMaterial }));
      saveSubject.complete();

      // THEN
      expect(lessonMaterialFormService.getLessonMaterial).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(lessonMaterialService.update).toHaveBeenCalledWith(expect.objectContaining(lessonMaterial));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILessonMaterial>>();
      const lessonMaterial = { id: 123 };
      jest.spyOn(lessonMaterialFormService, 'getLessonMaterial').mockReturnValue({ id: null });
      jest.spyOn(lessonMaterialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lessonMaterial: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lessonMaterial }));
      saveSubject.complete();

      // THEN
      expect(lessonMaterialFormService.getLessonMaterial).toHaveBeenCalled();
      expect(lessonMaterialService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILessonMaterial>>();
      const lessonMaterial = { id: 123 };
      jest.spyOn(lessonMaterialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lessonMaterial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(lessonMaterialService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAttachment', () => {
      it('Should forward to attachmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(attachmentService, 'compareAttachment');
        comp.compareAttachment(entity, entity2);
        expect(attachmentService.compareAttachment).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLesson', () => {
      it('Should forward to lessonService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(lessonService, 'compareLesson');
        comp.compareLesson(entity, entity2);
        expect(lessonService.compareLesson).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
