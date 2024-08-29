import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { StudyTermDetailComponent } from './study-term-detail.component';

describe('StudyTerm Management Detail Component', () => {
  let comp: StudyTermDetailComponent;
  let fixture: ComponentFixture<StudyTermDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTermDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./study-term-detail.component').then(m => m.StudyTermDetailComponent),
              resolve: { studyTerm: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(StudyTermDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTermDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load studyTerm on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', StudyTermDetailComponent);

      // THEN
      expect(instance.studyTerm()).toEqual(expect.objectContaining({ id: 123 }));
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
