import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnnouncementCourseSectionDetailComponent } from './announcement-course-section-detail.component';

describe('AnnouncementCourseSection Management Detail Component', () => {
  let comp: AnnouncementCourseSectionDetailComponent;
  let fixture: ComponentFixture<AnnouncementCourseSectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementCourseSectionDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./announcement-course-section-detail.component').then(m => m.AnnouncementCourseSectionDetailComponent),
              resolve: { announcementCourseSection: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AnnouncementCourseSectionDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementCourseSectionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load announcementCourseSection on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AnnouncementCourseSectionDetailComponent);

      // THEN
      expect(instance.announcementCourseSection()).toEqual(expect.objectContaining({ id: 123 }));
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
