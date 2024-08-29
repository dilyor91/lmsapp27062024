import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuizResultDetailComponent } from './quiz-result-detail.component';

describe('QuizResult Management Detail Component', () => {
  let comp: QuizResultDetailComponent;
  let fixture: ComponentFixture<QuizResultDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResultDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./quiz-result-detail.component').then(m => m.QuizResultDetailComponent),
              resolve: { quizResult: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(QuizResultDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quizResult on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', QuizResultDetailComponent);

      // THEN
      expect(instance.quizResult()).toEqual(expect.objectContaining({ id: 123 }));
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
