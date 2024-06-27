import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { StudentAnswerQuestionDetailComponent } from './student-answer-question-detail.component';

describe('StudentAnswerQuestion Management Detail Component', () => {
  let comp: StudentAnswerQuestionDetailComponent;
  let fixture: ComponentFixture<StudentAnswerQuestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAnswerQuestionDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: StudentAnswerQuestionDetailComponent,
              resolve: { studentAnswerQuestion: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(StudentAnswerQuestionDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAnswerQuestionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load studentAnswerQuestion on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', StudentAnswerQuestionDetailComponent);

      // THEN
      expect(instance.studentAnswerQuestion()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
