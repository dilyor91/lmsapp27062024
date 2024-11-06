import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { BuildingService } from '../service/building.service';
import { IBuilding } from '../building.model';
import { BuildingFormService } from './building-form.service';

import { BuildingUpdateComponent } from './building-update.component';

describe('Building Management Update Component', () => {
  let comp: BuildingUpdateComponent;
  let fixture: ComponentFixture<BuildingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let buildingFormService: BuildingFormService;
  let buildingService: BuildingService;
  let facultyService: FacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BuildingUpdateComponent],
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
      .overrideTemplate(BuildingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BuildingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    buildingFormService = TestBed.inject(BuildingFormService);
    buildingService = TestBed.inject(BuildingService);
    facultyService = TestBed.inject(FacultyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Faculty query and add missing value', () => {
      const building: IBuilding = { id: 456 };
      const faculty: IFaculty = { id: 20664 };
      building.faculty = faculty;

      const facultyCollection: IFaculty[] = [{ id: 18359 }];
      jest.spyOn(facultyService, 'query').mockReturnValue(of(new HttpResponse({ body: facultyCollection })));
      const additionalFaculties = [faculty];
      const expectedCollection: IFaculty[] = [...additionalFaculties, ...facultyCollection];
      jest.spyOn(facultyService, 'addFacultyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ building });
      comp.ngOnInit();

      expect(facultyService.query).toHaveBeenCalled();
      expect(facultyService.addFacultyToCollectionIfMissing).toHaveBeenCalledWith(
        facultyCollection,
        ...additionalFaculties.map(expect.objectContaining),
      );
      expect(comp.facultiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const building: IBuilding = { id: 456 };
      const faculty: IFaculty = { id: 7435 };
      building.faculty = faculty;

      activatedRoute.data = of({ building });
      comp.ngOnInit();

      expect(comp.facultiesSharedCollection).toContain(faculty);
      expect(comp.building).toEqual(building);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBuilding>>();
      const building = { id: 123 };
      jest.spyOn(buildingFormService, 'getBuilding').mockReturnValue(building);
      jest.spyOn(buildingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ building });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: building }));
      saveSubject.complete();

      // THEN
      expect(buildingFormService.getBuilding).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(buildingService.update).toHaveBeenCalledWith(expect.objectContaining(building));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBuilding>>();
      const building = { id: 123 };
      jest.spyOn(buildingFormService, 'getBuilding').mockReturnValue({ id: null });
      jest.spyOn(buildingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ building: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: building }));
      saveSubject.complete();

      // THEN
      expect(buildingFormService.getBuilding).toHaveBeenCalled();
      expect(buildingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBuilding>>();
      const building = { id: 123 };
      jest.spyOn(buildingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ building });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(buildingService.update).toHaveBeenCalled();
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
