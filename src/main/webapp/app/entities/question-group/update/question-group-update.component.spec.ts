import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { QuestionGroupService } from '../service/question-group.service';
import { IQuestionGroup } from '../question-group.model';
import { QuestionGroupFormService } from './question-group-form.service';

import { QuestionGroupUpdateComponent } from './question-group-update.component';

describe('QuestionGroup Management Update Component', () => {
  let comp: QuestionGroupUpdateComponent;
  let fixture: ComponentFixture<QuestionGroupUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let questionGroupFormService: QuestionGroupFormService;
  let questionGroupService: QuestionGroupService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionGroupUpdateComponent],
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
      .overrideTemplate(QuestionGroupUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    questionGroupFormService = TestBed.inject(QuestionGroupFormService);
    questionGroupService = TestBed.inject(QuestionGroupService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const questionGroup: IQuestionGroup = { id: 456 };
      const course: ICourse = { id: 6996 };
      questionGroup.course = course;

      const courseCollection: ICourse[] = [{ id: 16993 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ questionGroup });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const questionGroup: IQuestionGroup = { id: 456 };
      const course: ICourse = { id: 9694 };
      questionGroup.course = course;

      activatedRoute.data = of({ questionGroup });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.questionGroup).toEqual(questionGroup);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestionGroup>>();
      const questionGroup = { id: 123 };
      jest.spyOn(questionGroupFormService, 'getQuestionGroup').mockReturnValue(questionGroup);
      jest.spyOn(questionGroupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ questionGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: questionGroup }));
      saveSubject.complete();

      // THEN
      expect(questionGroupFormService.getQuestionGroup).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(questionGroupService.update).toHaveBeenCalledWith(expect.objectContaining(questionGroup));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestionGroup>>();
      const questionGroup = { id: 123 };
      jest.spyOn(questionGroupFormService, 'getQuestionGroup').mockReturnValue({ id: null });
      jest.spyOn(questionGroupService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ questionGroup: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: questionGroup }));
      saveSubject.complete();

      // THEN
      expect(questionGroupFormService.getQuestionGroup).toHaveBeenCalled();
      expect(questionGroupService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestionGroup>>();
      const questionGroup = { id: 123 };
      jest.spyOn(questionGroupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ questionGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(questionGroupService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourse', () => {
      it('Should forward to courseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
