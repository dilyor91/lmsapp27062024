import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { StudyAcademicYearDetailComponent } from './study-academic-year-detail.component';

describe('StudyAcademicYear Management Detail Component', () => {
  let comp: StudyAcademicYearDetailComponent;
  let fixture: ComponentFixture<StudyAcademicYearDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAcademicYearDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: StudyAcademicYearDetailComponent,
              resolve: { studyAcademicYear: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(StudyAcademicYearDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAcademicYearDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load studyAcademicYear on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', StudyAcademicYearDetailComponent);

      // THEN
      expect(instance.studyAcademicYear()).toEqual(expect.objectContaining({ id: 123 }));
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
