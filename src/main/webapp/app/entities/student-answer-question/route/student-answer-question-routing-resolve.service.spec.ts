import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IStudentAnswerQuestion } from '../student-answer-question.model';
import { StudentAnswerQuestionService } from '../service/student-answer-question.service';

import studentAnswerQuestionResolve from './student-answer-question-routing-resolve.service';

describe('StudentAnswerQuestion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: StudentAnswerQuestionService;
  let resultStudentAnswerQuestion: IStudentAnswerQuestion | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(StudentAnswerQuestionService);
    resultStudentAnswerQuestion = undefined;
  });

  describe('resolve', () => {
    it('should return IStudentAnswerQuestion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        studentAnswerQuestionResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultStudentAnswerQuestion = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultStudentAnswerQuestion).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        studentAnswerQuestionResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultStudentAnswerQuestion = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStudentAnswerQuestion).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IStudentAnswerQuestion>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        studentAnswerQuestionResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultStudentAnswerQuestion = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultStudentAnswerQuestion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
