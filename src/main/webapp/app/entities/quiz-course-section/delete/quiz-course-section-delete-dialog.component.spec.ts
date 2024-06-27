jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { QuizCourseSectionService } from '../service/quiz-course-section.service';

import { QuizCourseSectionDeleteDialogComponent } from './quiz-course-section-delete-dialog.component';

describe('QuizCourseSection Management Delete Component', () => {
  let comp: QuizCourseSectionDeleteDialogComponent;
  let fixture: ComponentFixture<QuizCourseSectionDeleteDialogComponent>;
  let service: QuizCourseSectionService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizCourseSectionDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(QuizCourseSectionDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(QuizCourseSectionDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(QuizCourseSectionService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
