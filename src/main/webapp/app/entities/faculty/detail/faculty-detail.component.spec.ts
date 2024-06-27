import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { FacultyDetailComponent } from './faculty-detail.component';

describe('Faculty Management Detail Component', () => {
  let comp: FacultyDetailComponent;
  let fixture: ComponentFixture<FacultyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FacultyDetailComponent,
              resolve: { faculty: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FacultyDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load faculty on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FacultyDetailComponent);

      // THEN
      expect(instance.faculty()).toEqual(expect.objectContaining({ id: 123 }));
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
