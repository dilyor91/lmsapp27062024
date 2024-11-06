import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IQuestionGroup } from 'app/entities/question-group/question-group.model';
import { QuestionGroupService } from 'app/entities/question-group/service/question-group.service';
import { QuestionService } from '../service/question.service';
import { IQuestion } from '../question.model';
import { QuestionFormService } from './question-form.service';

import { QuestionUpdateComponent } from './question-update.component';

describe('Question Management Update Component', () => {
  let comp: QuestionUpdateComponent;
  let fixture: ComponentFixture<QuestionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let questionFormService: QuestionFormService;
  let questionService: QuestionService;
  let questionGroupService: QuestionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionUpdateComponent],
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
      .overrideTemplate(QuestionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuestionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    questionFormService = TestBed.inject(QuestionFormService);
    questionService = TestBed.inject(QuestionService);
    questionGroupService = TestBed.inject(QuestionGroupService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call QuestionGroup query and add missing value', () => {
      const question: IQuestion = { id: 456 };
      const questionGroup: IQuestionGroup = { id: 13403 };
      question.questionGroup = questionGroup;

      const questionGroupCollection: IQuestionGroup[] = [{ id: 19961 }];
      jest.spyOn(questionGroupService, 'query').mockReturnValue(of(new HttpResponse({ body: questionGroupCollection })));
      const additionalQuestionGroups = [questionGroup];
      const expectedCollection: IQuestionGroup[] = [...additionalQuestionGroups, ...questionGroupCollection];
      jest.spyOn(questionGroupService, 'addQuestionGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ question });
      comp.ngOnInit();

      expect(questionGroupService.query).toHaveBeenCalled();
      expect(questionGroupService.addQuestionGroupToCollectionIfMissing).toHaveBeenCalledWith(
        questionGroupCollection,
        ...additionalQuestionGroups.map(expect.objectContaining),
      );
      expect(comp.questionGroupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const question: IQuestion = { id: 456 };
      const questionGroup: IQuestionGroup = { id: 23895 };
      question.questionGroup = questionGroup;

      activatedRoute.data = of({ question });
      comp.ngOnInit();

      expect(comp.questionGroupsSharedCollection).toContain(questionGroup);
      expect(comp.question).toEqual(question);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestion>>();
      const question = { id: 123 };
      jest.spyOn(questionFormService, 'getQuestion').mockReturnValue(question);
      jest.spyOn(questionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ question });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: question }));
      saveSubject.complete();

      // THEN
      expect(questionFormService.getQuestion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(questionService.update).toHaveBeenCalledWith(expect.objectContaining(question));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestion>>();
      const question = { id: 123 };
      jest.spyOn(questionFormService, 'getQuestion').mockReturnValue({ id: null });
      jest.spyOn(questionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ question: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: question }));
      saveSubject.complete();

      // THEN
      expect(questionFormService.getQuestion).toHaveBeenCalled();
      expect(questionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuestion>>();
      const question = { id: 123 };
      jest.spyOn(questionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ question });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(questionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuestionGroup', () => {
      it('Should forward to questionGroupService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(questionGroupService, 'compareQuestionGroup');
        comp.compareQuestionGroup(entity, entity2);
        expect(questionGroupService.compareQuestionGroup).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
