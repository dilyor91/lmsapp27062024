import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AttendanceDetailDetailComponent } from './attendance-detail-detail.component';

describe('AttendanceDetail Management Detail Component', () => {
  let comp: AttendanceDetailDetailComponent;
  let fixture: ComponentFixture<AttendanceDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDetailDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AttendanceDetailDetailComponent,
              resolve: { attendanceDetail: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AttendanceDetailDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDetailDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load attendanceDetail on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AttendanceDetailDetailComponent);

      // THEN
      expect(instance.attendanceDetail()).toEqual(expect.objectContaining({ id: 123 }));
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
