import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnnouncementStudentReadDetailComponent } from './announcement-student-read-detail.component';

describe('AnnouncementStudentRead Management Detail Component', () => {
  let comp: AnnouncementStudentReadDetailComponent;
  let fixture: ComponentFixture<AnnouncementStudentReadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementStudentReadDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./announcement-student-read-detail.component').then(m => m.AnnouncementStudentReadDetailComponent),
              resolve: { announcementStudentRead: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AnnouncementStudentReadDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementStudentReadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load announcementStudentRead on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AnnouncementStudentReadDetailComponent);

      // THEN
      expect(instance.announcementStudentRead()).toEqual(expect.objectContaining({ id: 123 }));
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
