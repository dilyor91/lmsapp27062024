import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStudyAcademicYear } from 'app/entities/study-academic-year/study-academic-year.model';
import { StudyAcademicYearService } from 'app/entities/study-academic-year/service/study-academic-year.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { SpecialityService } from 'app/entities/speciality/service/speciality.service';
import { IGroup } from 'app/entities/group/group.model';
import { GroupService } from 'app/entities/group/service/group.service';
import { IStudent } from '../student.model';
import { StudentService } from '../service/student.service';
import { StudentFormService } from './student-form.service';

import { StudentUpdateComponent } from './student-update.component';

describe('Student Management Update Component', () => {
  let comp: StudentUpdateComponent;
  let fixture: ComponentFixture<StudentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentFormService: StudentFormService;
  let studentService: StudentService;
  let studyAcademicYearService: StudyAcademicYearService;
  let userService: UserService;
  let facultyService: FacultyService;
  let specialityService: SpecialityService;
  let groupService: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentUpdateComponent],
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
      .overrideTemplate(StudentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentFormService = TestBed.inject(StudentFormService);
    studentService = TestBed.inject(StudentService);
    studyAcademicYearService = TestBed.inject(StudyAcademicYearService);
    userService = TestBed.inject(UserService);
    facultyService = TestBed.inject(FacultyService);
    specialityService = TestBed.inject(SpecialityService);
    groupService = TestBed.inject(GroupService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call studyAcademicYear query and add missing value', () => {
      const student: IStudent = { id: 456 };
      const studyAcademicYear: IStudyAcademicYear = { id: 16624 };
      student.studyAcademicYear = studyAcademicYear;

      const studyAcademicYearCollection: IStudyAcademicYear[] = [{ id: 16963 }];
      jest.spyOn(studyAcademicYearService, 'query').mockReturnValue(of(new HttpResponse({ body: studyAcademicYearCollection })));
      const expectedCollection: IStudyAcademicYear[] = [studyAcademicYear, ...studyAcademicYearCollection];
      jest.spyOn(studyAcademicYearService, 'addStudyAcademicYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(studyAcademicYearService.query).toHaveBeenCalled();
      expect(studyAcademicYearService.addStudyAcademicYearToCollectionIfMissing).toHaveBeenCalledWith(
        studyAcademicYearCollection,
        studyAcademicYear,
      );
      expect(comp.studyAcademicYearsCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const student: IStudent = { id: 456 };
      const user: IUser = { id: 970 };
      student.user = user;

      const userCollection: IUser[] = [{ id: 29784 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Faculty query and add missing value', () => {
      const student: IStudent = { id: 456 };
      const faculty: IFaculty = { id: 20553 };
      student.faculty = faculty;

      const facultyCollection: IFaculty[] = [{ id: 10731 }];
      jest.spyOn(facultyService, 'query').mockReturnValue(of(new HttpResponse({ body: facultyCollection })));
      const additionalFaculties = [faculty];
      const expectedCollection: IFaculty[] = [...additionalFaculties, ...facultyCollection];
      jest.spyOn(facultyService, 'addFacultyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(facultyService.query).toHaveBeenCalled();
      expect(facultyService.addFacultyToCollectionIfMissing).toHaveBeenCalledWith(
        facultyCollection,
        ...additionalFaculties.map(expect.objectContaining),
      );
      expect(comp.facultiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Speciality query and add missing value', () => {
      const student: IStudent = { id: 456 };
      const speciality: ISpeciality = { id: 29360 };
      student.speciality = speciality;

      const specialityCollection: ISpeciality[] = [{ id: 7395 }];
      jest.spyOn(specialityService, 'query').mockReturnValue(of(new HttpResponse({ body: specialityCollection })));
      const additionalSpecialities = [speciality];
      const expectedCollection: ISpeciality[] = [...additionalSpecialities, ...specialityCollection];
      jest.spyOn(specialityService, 'addSpecialityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(specialityService.query).toHaveBeenCalled();
      expect(specialityService.addSpecialityToCollectionIfMissing).toHaveBeenCalledWith(
        specialityCollection,
        ...additionalSpecialities.map(expect.objectContaining),
      );
      expect(comp.specialitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Group query and add missing value', () => {
      const student: IStudent = { id: 456 };
      const group: IGroup = { id: 16920 };
      student.group = group;

      const groupCollection: IGroup[] = [{ id: 14468 }];
      jest.spyOn(groupService, 'query').mockReturnValue(of(new HttpResponse({ body: groupCollection })));
      const additionalGroups = [group];
      const expectedCollection: IGroup[] = [...additionalGroups, ...groupCollection];
      jest.spyOn(groupService, 'addGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(groupService.query).toHaveBeenCalled();
      expect(groupService.addGroupToCollectionIfMissing).toHaveBeenCalledWith(
        groupCollection,
        ...additionalGroups.map(expect.objectContaining),
      );
      expect(comp.groupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const student: IStudent = { id: 456 };
      const studyAcademicYear: IStudyAcademicYear = { id: 1790 };
      student.studyAcademicYear = studyAcademicYear;
      const user: IUser = { id: 18176 };
      student.user = user;
      const faculty: IFaculty = { id: 31665 };
      student.faculty = faculty;
      const speciality: ISpeciality = { id: 23678 };
      student.speciality = speciality;
      const group: IGroup = { id: 15021 };
      student.group = group;

      activatedRoute.data = of({ student });
      comp.ngOnInit();

      expect(comp.studyAcademicYearsCollection).toContain(studyAcademicYear);
      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.facultiesSharedCollection).toContain(faculty);
      expect(comp.specialitiesSharedCollection).toContain(speciality);
      expect(comp.groupsSharedCollection).toContain(group);
      expect(comp.student).toEqual(student);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudent>>();
      const student = { id: 123 };
      jest.spyOn(studentFormService, 'getStudent').mockReturnValue(student);
      jest.spyOn(studentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ student });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: student }));
      saveSubject.complete();

      // THEN
      expect(studentFormService.getStudent).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentService.update).toHaveBeenCalledWith(expect.objectContaining(student));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudent>>();
      const student = { id: 123 };
      jest.spyOn(studentFormService, 'getStudent').mockReturnValue({ id: null });
      jest.spyOn(studentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ student: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: student }));
      saveSubject.complete();

      // THEN
      expect(studentFormService.getStudent).toHaveBeenCalled();
      expect(studentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudent>>();
      const student = { id: 123 };
      jest.spyOn(studentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ student });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudyAcademicYear', () => {
      it('Should forward to studyAcademicYearService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studyAcademicYearService, 'compareStudyAcademicYear');
        comp.compareStudyAcademicYear(entity, entity2);
        expect(studyAcademicYearService.compareStudyAcademicYear).toHaveBeenCalledWith(entity, entity2);
      });
    });

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

    describe('compareSpeciality', () => {
      it('Should forward to specialityService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(specialityService, 'compareSpeciality');
        comp.compareSpeciality(entity, entity2);
        expect(specialityService.compareSpeciality).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareGroup', () => {
      it('Should forward to groupService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(groupService, 'compareGroup');
        comp.compareGroup(entity, entity2);
        expect(groupService.compareGroup).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
