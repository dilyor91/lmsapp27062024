import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { SpecialityService } from 'app/entities/speciality/service/speciality.service';
import { GroupService } from '../service/group.service';
import { IGroup } from '../group.model';
import { GroupFormService } from './group-form.service';

import { GroupUpdateComponent } from './group-update.component';

describe('Group Management Update Component', () => {
  let comp: GroupUpdateComponent;
  let fixture: ComponentFixture<GroupUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let groupFormService: GroupFormService;
  let groupService: GroupService;
  let specialityService: SpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupUpdateComponent],
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
      .overrideTemplate(GroupUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GroupUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    groupFormService = TestBed.inject(GroupFormService);
    groupService = TestBed.inject(GroupService);
    specialityService = TestBed.inject(SpecialityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Speciality query and add missing value', () => {
      const group: IGroup = { id: 456 };
      const speciality: ISpeciality = { id: 11653 };
      group.speciality = speciality;

      const specialityCollection: ISpeciality[] = [{ id: 10686 }];
      jest.spyOn(specialityService, 'query').mockReturnValue(of(new HttpResponse({ body: specialityCollection })));
      const additionalSpecialities = [speciality];
      const expectedCollection: ISpeciality[] = [...additionalSpecialities, ...specialityCollection];
      jest.spyOn(specialityService, 'addSpecialityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ group });
      comp.ngOnInit();

      expect(specialityService.query).toHaveBeenCalled();
      expect(specialityService.addSpecialityToCollectionIfMissing).toHaveBeenCalledWith(
        specialityCollection,
        ...additionalSpecialities.map(expect.objectContaining),
      );
      expect(comp.specialitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const group: IGroup = { id: 456 };
      const speciality: ISpeciality = { id: 26377 };
      group.speciality = speciality;

      activatedRoute.data = of({ group });
      comp.ngOnInit();

      expect(comp.specialitiesSharedCollection).toContain(speciality);
      expect(comp.group).toEqual(group);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroup>>();
      const group = { id: 123 };
      jest.spyOn(groupFormService, 'getGroup').mockReturnValue(group);
      jest.spyOn(groupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ group });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: group }));
      saveSubject.complete();

      // THEN
      expect(groupFormService.getGroup).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(groupService.update).toHaveBeenCalledWith(expect.objectContaining(group));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroup>>();
      const group = { id: 123 };
      jest.spyOn(groupFormService, 'getGroup').mockReturnValue({ id: null });
      jest.spyOn(groupService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ group: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: group }));
      saveSubject.complete();

      // THEN
      expect(groupFormService.getGroup).toHaveBeenCalled();
      expect(groupService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroup>>();
      const group = { id: 123 };
      jest.spyOn(groupService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ group });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(groupService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSpeciality', () => {
      it('Should forward to specialityService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(specialityService, 'compareSpeciality');
        comp.compareSpeciality(entity, entity2);
        expect(specialityService.compareSpeciality).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
