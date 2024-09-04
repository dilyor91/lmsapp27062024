jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AnnouncementCourseSectionService } from '../service/announcement-course-section.service';

import { AnnouncementCourseSectionDeleteDialogComponent } from './announcement-course-section-delete-dialog.component';

describe('AnnouncementCourseSection Management Delete Component', () => {
  let comp: AnnouncementCourseSectionDeleteDialogComponent;
  let fixture: ComponentFixture<AnnouncementCourseSectionDeleteDialogComponent>;
  let service: AnnouncementCourseSectionService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnouncementCourseSectionDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(AnnouncementCourseSectionDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AnnouncementCourseSectionDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AnnouncementCourseSectionService);
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
