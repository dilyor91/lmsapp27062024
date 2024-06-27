import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { FacultyService } from '../service/faculty.service';
import { IFaculty } from '../faculty.model';
import { FacultyFormService } from './faculty-form.service';

import { FacultyUpdateComponent } from './faculty-update.component';

describe('Faculty Management Update Component', () => {
  let comp: FacultyUpdateComponent;
  let fixture: ComponentFixture<FacultyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let facultyFormService: FacultyFormService;
  let facultyService: FacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FacultyUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FacultyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FacultyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    facultyFormService = TestBed.inject(FacultyFormService);
    facultyService = TestBed.inject(FacultyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const faculty: IFaculty = { id: 456 };

      activatedRoute.data = of({ faculty });
      comp.ngOnInit();

      expect(comp.faculty).toEqual(faculty);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFaculty>>();
      const faculty = { id: 123 };
      jest.spyOn(facultyFormService, 'getFaculty').mockReturnValue(faculty);
      jest.spyOn(facultyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ faculty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: faculty }));
      saveSubject.complete();

      // THEN
      expect(facultyFormService.getFaculty).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(facultyService.update).toHaveBeenCalledWith(expect.objectContaining(faculty));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFaculty>>();
      const faculty = { id: 123 };
      jest.spyOn(facultyFormService, 'getFaculty').mockReturnValue({ id: null });
      jest.spyOn(facultyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ faculty: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: faculty }));
      saveSubject.complete();

      // THEN
      expect(facultyFormService.getFaculty).toHaveBeenCalled();
      expect(facultyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFaculty>>();
      const faculty = { id: 123 };
      jest.spyOn(facultyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ faculty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(facultyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
