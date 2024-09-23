import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { IDepartment } from 'app/entities/department/department.model';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { ITeacher } from '../teacher.model';
import { TeacherService } from '../service/teacher.service';
import { TeacherFormService } from './teacher-form.service';

import { TeacherUpdateComponent } from './teacher-update.component';

describe('Teacher Management Update Component', () => {
  let comp: TeacherUpdateComponent;
  let fixture: ComponentFixture<TeacherUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teacherFormService: TeacherFormService;
  let teacherService: TeacherService;
  let userService: UserService;
  let facultyService: FacultyService;
  let departmentService: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeacherUpdateComponent],
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
      .overrideTemplate(TeacherUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeacherUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teacherFormService = TestBed.inject(TeacherFormService);
    teacherService = TestBed.inject(TeacherService);
    userService = TestBed.inject(UserService);
    facultyService = TestBed.inject(FacultyService);
    departmentService = TestBed.inject(DepartmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const teacher: ITeacher = { id: 456 };
      const user: IUser = { id: 13133 };
      teacher.user = user;

      const userCollection: IUser[] = [{ id: 16846 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ teacher });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Faculty query and add missing value', () => {
      const teacher: ITeacher = { id: 456 };
      const faculty: IFaculty = { id: 8227 };
      teacher.faculty = faculty;

      const facultyCollection: IFaculty[] = [{ id: 8300 }];
      jest.spyOn(facultyService, 'query').mockReturnValue(of(new HttpResponse({ body: facultyCollection })));
      const additionalFaculties = [faculty];
      const expectedCollection: IFaculty[] = [...additionalFaculties, ...facultyCollection];
      jest.spyOn(facultyService, 'addFacultyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ teacher });
      comp.ngOnInit();

      expect(facultyService.query).toHaveBeenCalled();
      expect(facultyService.addFacultyToCollectionIfMissing).toHaveBeenCalledWith(
        facultyCollection,
        ...additionalFaculties.map(expect.objectContaining),
      );
      expect(comp.facultiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Department query and add missing value', () => {
      const teacher: ITeacher = { id: 456 };
      const department: IDepartment = { id: 13132 };
      teacher.department = department;

      const departmentCollection: IDepartment[] = [{ id: 21483 }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const additionalDepartments = [department];
      const expectedCollection: IDepartment[] = [...additionalDepartments, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ teacher });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentToCollectionIfMissing).toHaveBeenCalledWith(
        departmentCollection,
        ...additionalDepartments.map(expect.objectContaining),
      );
      expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const teacher: ITeacher = { id: 456 };
      const user: IUser = { id: 11960 };
      teacher.user = user;
      const faculty: IFaculty = { id: 17425 };
      teacher.faculty = faculty;
      const department: IDepartment = { id: 32495 };
      teacher.department = department;

      activatedRoute.data = of({ teacher });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.facultiesSharedCollection).toContain(faculty);
      expect(comp.departmentsSharedCollection).toContain(department);
      expect(comp.teacher).toEqual(teacher);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeacher>>();
      const teacher = { id: 123 };
      jest.spyOn(teacherFormService, 'getTeacher').mockReturnValue(teacher);
      jest.spyOn(teacherService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teacher });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teacher }));
      saveSubject.complete();

      // THEN
      expect(teacherFormService.getTeacher).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(teacherService.update).toHaveBeenCalledWith(expect.objectContaining(teacher));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeacher>>();
      const teacher = { id: 123 };
      jest.spyOn(teacherFormService, 'getTeacher').mockReturnValue({ id: null });
      jest.spyOn(teacherService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teacher: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teacher }));
      saveSubject.complete();

      // THEN
      expect(teacherFormService.getTeacher).toHaveBeenCalled();
      expect(teacherService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeacher>>();
      const teacher = { id: 123 };
      jest.spyOn(teacherService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teacher });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teacherService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareFaculty', () => {
      it('Should forward to facultyService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(facultyService, 'compareFaculty');
        comp.compareFaculty(entity, entity2);
        expect(facultyService.compareFaculty).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDepartment', () => {
      it('Should forward to departmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(departmentService, 'compareDepartment');
        comp.compareDepartment(entity, entity2);
        expect(departmentService.compareDepartment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
