jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { StudentAnswerQuestionService } from '../service/student-answer-question.service';

import { StudentAnswerQuestionDeleteDialogComponent } from './student-answer-question-delete-dialog.component';

describe('StudentAnswerQuestion Management Delete Component', () => {
  let comp: StudentAnswerQuestionDeleteDialogComponent;
  let fixture: ComponentFixture<StudentAnswerQuestionDeleteDialogComponent>;
  let service: StudentAnswerQuestionService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentAnswerQuestionDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(StudentAnswerQuestionDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StudentAnswerQuestionDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StudentAnswerQuestionService);
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
