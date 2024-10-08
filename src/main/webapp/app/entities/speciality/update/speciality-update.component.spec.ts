import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { SpecialityService } from '../service/speciality.service';
import { ISpeciality } from '../speciality.model';
import { SpecialityFormService } from './speciality-form.service';

import { SpecialityUpdateComponent } from './speciality-update.component';

describe('Speciality Management Update Component', () => {
  let comp: SpecialityUpdateComponent;
  let fixture: ComponentFixture<SpecialityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let specialityFormService: SpecialityFormService;
  let specialityService: SpecialityService;
  let facultyService: FacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpecialityUpdateComponent],
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
      .overrideTemplate(SpecialityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SpecialityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    specialityFormService = TestBed.inject(SpecialityFormService);
    specialityService = TestBed.inject(SpecialityService);
    facultyService = TestBed.inject(FacultyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Faculty query and add missing value', () => {
      const speciality: ISpeciality = { id: 456 };
      const faculty: IFaculty = { id: 18291 };
      speciality.faculty = faculty;

      const facultyCollection: IFaculty[] = [{ id: 27719 }];
      jest.spyOn(facultyService, 'query').mockReturnValue(of(new HttpResponse({ body: facultyCollection })));
      const additionalFaculties = [faculty];
      const expectedCollection: IFaculty[] = [...additionalFaculties, ...facultyCollection];
      jest.spyOn(facultyService, 'addFacultyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ speciality });
      comp.ngOnInit();

      expect(facultyService.query).toHaveBeenCalled();
      expect(facultyService.addFacultyToCollectionIfMissing).toHaveBeenCalledWith(
        facultyCollection,
        ...additionalFaculties.map(expect.objectContaining),
      );
      expect(comp.facultiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const speciality: ISpeciality = { id: 456 };
      const faculty: IFaculty = { id: 12023 };
      speciality.faculty = faculty;

      activatedRoute.data = of({ speciality });
      comp.ngOnInit();

      expect(comp.facultiesSharedCollection).toContain(faculty);
      expect(comp.speciality).toEqual(speciality);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpeciality>>();
      const speciality = { id: 123 };
      jest.spyOn(specialityFormService, 'getSpeciality').mockReturnValue(speciality);
      jest.spyOn(specialityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ speciality });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: speciality }));
      saveSubject.complete();

      // THEN
      expect(specialityFormService.getSpeciality).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(specialityService.update).toHaveBeenCalledWith(expect.objectContaining(speciality));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpeciality>>();
      const speciality = { id: 123 };
      jest.spyOn(specialityFormService, 'getSpeciality').mockReturnValue({ id: null });
      jest.spyOn(specialityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ speciality: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: speciality }));
      saveSubject.complete();

      // THEN
      expect(specialityFormService.getSpeciality).toHaveBeenCalled();
      expect(specialityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISpeciality>>();
      const speciality = { id: 123 };
      jest.spyOn(specialityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ speciality });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(specialityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFaculty', () => {
      it('Should forward to facultyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(facultyService, 'compareFaculty');
        comp.compareFaculty(entity, entity2);
        expect(facultyService.compareFaculty).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
