import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { AssignmentCourseSectionDetailComponent } from './assignment-course-section-detail.component';

describe('AssignmentCourseSection Management Detail Component', () => {
  let comp: AssignmentCourseSectionDetailComponent;
  let fixture: ComponentFixture<AssignmentCourseSectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentCourseSectionDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./assignment-course-section-detail.component').then(m => m.AssignmentCourseSectionDetailComponent),
              resolve: { assignmentCourseSection: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AssignmentCourseSectionDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCourseSectionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load assignmentCourseSection on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AssignmentCourseSectionDetailComponent);

      // THEN
      expect(instance.assignmentCourseSection()).toEqual(expect.objectContaining({ id: 123 }));
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
