import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { IQuestionGroup } from 'app/entities/question-group/question-group.model';
import { QuestionGroupService } from 'app/entities/question-group/service/question-group.service';
import { IQuizQuestionGroup } from '../quiz-question-group.model';
import { QuizQuestionGroupService } from '../service/quiz-question-group.service';
import { QuizQuestionGroupFormService } from './quiz-question-group-form.service';

import { QuizQuestionGroupUpdateComponent } from './quiz-question-group-update.component';

describe('QuizQuestionGroup Management Update Component', () => {
  let comp: QuizQuestionGroupUpdateComponent;
  let fixture: ComponentFixture<QuizQuestionGroupUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quizQuestionGroupFormService: QuizQuestionGroupFormService;
  let quizQuestionGroupService: QuizQuestionGroupService;
  let quizService: QuizService;
  let questionGroupService: QuestionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizQuestionGroupUpdateComponent],
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
      .overrideTemplate(QuizQuestionGroupUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuizQuestionGroupUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quizQuestionGroupFormService = TestBed.inject(QuizQuestionGroupFormService);
    quizQuestionGroupService = TestBed.inject(QuizQuestionGroupService);
    quizService = TestBed.inject(QuizService);
    questionGroupService = TestBed.inject(QuestionGroupService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Quiz query and add missing value', () => {
      const quizQuestionGroup: IQuizQuestionGroup = { id: 456 };
      const quiz: IQuiz = { id: 29975 };
      quizQuestionGroup.quiz = quiz;

      const quizCollection: IQuiz[] = [{ id: 14884 }];
      jest.spyOn(quizService, 'query').mockReturnValue(of(new HttpResponse({ body: quizCollection })));
      const additionalQuizzes = [quiz];
      const expectedCollection: IQuiz[] = [...additionalQuizzes, ...quizCollection];
      jest.spyOn(quizService, 'addQuizToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizQuestionGroup });
      comp.ngOnInit();

      expect(quizService.query).toHaveBeenCalled();
      expect(quizService.addQuizToCollectionIfMissing).toHaveBeenCalledWith(
        quizCollection,
        ...additionalQuizzes.map(expect.objectContaining),
      );
      expect(comp.quizzesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call QuestionGroup query and add missing value', () => {
      const quizQuestionGroup: IQuizQuestionGroup = { id: 456 };
      const questionGroup: IQuestionGroup = { id: 14359 };
      quizQuestionGroup.questionGroup = questionGroup;

      const questionGroupCollection: IQuestionGroup[] = [{ id: 15639 }];
      jest.spyOn(questionGroupService, 'query').mockReturnValue(of(new HttpResponse({ body: questionGroupCollection })));
      const additionalQuestionGroups = [questionGroup];
      const expectedCollection: IQuestionGroup[] = [...additionalQuestionGroups, ...questionGroupCollection];
      jest.spyOn(questionGroupService, 'addQuestionGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizQuestionGroup });
      comp.ngOnInit();

      expect(questionGroupService.query).toHaveBeenCalled();
      expect(questionGroupService.addQuestionGroupToCollectionIfMissing).toHaveBeenCalledWith(
        questionGroupCollection,
        ...additionalQuestionGroups.map(expect.objectContaining),
      );
      expect(comp.questionGroupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const quizQuestionGroup: IQuizQuestionGroup = { id: 456 };
      const quiz: IQuiz = { id: 28308 };
      quizQuestionGroup.quiz = quiz;
      const questionGroup: IQuestionGroup = { id: 5464 };
      quizQuestionGroup.questionGroup = questionGroup;

      activatedRoute.data = of({ quizQuestionGroup });
      comp.ngOnInit();

      expect(comp.quizzesSharedCollection).toContain(quiz);
      expect(comp.questionGroupsSharedCollection).toContain(questionGroup);
      expect(comp.quizQuestionGroup).toEqual(quizQuestionGroup);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizQuestionGroup>>();
      const quizQuestionGroup = { id: 123 };
      jest.spyOn(quizQuestionGroupFormService, 'getQuizQuestionGroup').mockReturnValue(quizQuestionGroup);
      jest.spyOn(quizQuestionGroupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizQuestionGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quizQuestionGroup }));
      saveSubject.complete();

      // THEN
      expect(quizQuestionGroupFormService.getQuizQuestionGroup).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quizQuestionGroupService.update).toHaveBeenCalledWith(expect.objectContaining(quizQuestionGroup));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizQuestionGroup>>();
      const quizQuestionGroup = { id: 123 };
      jest.spyOn(quizQuestionGroupFormService, 'getQuizQuestionGroup').mockReturnValue({ id: null });
      jest.spyOn(quizQuestionGroupService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizQuestionGroup: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quizQuestionGroup }));
      saveSubject.complete();

      // THEN
      expect(quizQuestionGroupFormService.getQuizQuestionGroup).toHaveBeenCalled();
      expect(quizQuestionGroupService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizQuestionGroup>>();
      const quizQuestionGroup = { id: 123 };
      jest.spyOn(quizQuestionGroupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizQuestionGroup });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quizQuestionGroupService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuiz', () => {
      it('Should forward to quizService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quizService, 'compareQuiz');
        comp.compareQuiz(entity, entity2);
        expect(quizService.compareQuiz).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
