import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuizQuestionGroupDetailComponent } from './quiz-question-group-detail.component';

describe('QuizQuestionGroup Management Detail Component', () => {
  let comp: QuizQuestionGroupDetailComponent;
  let fixture: ComponentFixture<QuizQuestionGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizQuestionGroupDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: QuizQuestionGroupDetailComponent,
              resolve: { quizQuestionGroup: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(QuizQuestionGroupDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionGroupDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quizQuestionGroup on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuizQuestionGroupDetailComponent);

      // THEN
      expect(instance.quizQuestionGroup()).toEqual(expect.objectContaining({ id: 123 }));
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
