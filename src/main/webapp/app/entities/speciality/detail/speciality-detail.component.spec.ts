import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { SpecialityDetailComponent } from './speciality-detail.component';

describe('Speciality Management Detail Component', () => {
  let comp: SpecialityDetailComponent;
  let fixture: ComponentFixture<SpecialityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SpecialityDetailComponent,
              resolve: { speciality: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SpecialityDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load speciality on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SpecialityDetailComponent);

      // THEN
      expect(instance.speciality()).toEqual(expect.objectContaining({ id: 123 }));
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
