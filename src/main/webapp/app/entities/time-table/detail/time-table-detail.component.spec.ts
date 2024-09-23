import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { TimeTableDetailComponent } from './time-table-detail.component';

describe('TimeTable Management Detail Component', () => {
  let comp: TimeTableDetailComponent;
  let fixture: ComponentFixture<TimeTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTableDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./time-table-detail.component').then(m => m.TimeTableDetailComponent),
              resolve: { timeTable: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TimeTableDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load timeTable on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TimeTableDetailComponent);

      // THEN
      expect(instance.timeTable()).toEqual(expect.objectContaining({ id: 123 }));
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
