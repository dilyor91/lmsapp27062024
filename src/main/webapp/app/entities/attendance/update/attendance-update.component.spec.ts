import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IAttendance } from '../attendance.model';
import { AttendanceService } from '../service/attendance.service';
import { AttendanceFormService } from './attendance-form.service';

import { AttendanceUpdateComponent } from './attendance-update.component';

describe('Attendance Management Update Component', () => {
  let comp: AttendanceUpdateComponent;
  let fixture: ComponentFixture<AttendanceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let attendanceFormService: AttendanceFormService;
  let attendanceService: AttendanceService;
  let studentService: StudentService;
  let lessonService: LessonService;
  let courseService: CourseService;
  let courseSectionService: CourseSectionService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AttendanceUpdateComponent],
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
      .overrideTemplate(AttendanceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AttendanceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    attendanceFormService = TestBed.inject(AttendanceFormService);
    attendanceService = TestBed.inject(AttendanceService);
    studentService = TestBed.inject(StudentService);
    lessonService = TestBed.inject(LessonService);
    courseService = TestBed.inject(CourseService);
    courseSectionService = TestBed.inject(CourseSectionService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Student query and add missing value', () => {
      const attendance: IAttendance = { id: 456 };
      const student: IStudent = { id: 22059 };
      attendance.student = student;

      const studentCollection: IStudent[] = [{ id: 12873 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Lesson query and add missing value', () => {
      const attendance: IAttendance = { id: 456 };
      const lesson: ILesson = { id: 19086 };
      attendance.lesson = lesson;

      const lessonCollection: ILesson[] = [{ id: 5896 }];
      jest.spyOn(lessonService, 'query').mockReturnValue(of(new HttpResponse({ body: lessonCollection })));
      const additionalLessons = [lesson];
      const expectedCollection: ILesson[] = [...additionalLessons, ...lessonCollection];
      jest.spyOn(lessonService, 'addLessonToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      expect(lessonService.query).toHaveBeenCalled();
      expect(lessonService.addLessonToCollectionIfMissing).toHaveBeenCalledWith(
        lessonCollection,
        ...additionalLessons.map(expect.objectContaining),
      );
      expect(comp.lessonsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const attendance: IAttendance = { id: 456 };
      const course: ICourse = { id: 23096 };
      attendance.course = course;

      const courseCollection: ICourse[] = [{ id: 5830 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CourseSection query and add missing value', () => {
      const attendance: IAttendance = { id: 456 };
      const courseSection: ICourseSection = { id: 18037 };
      attendance.courseSection = courseSection;

      const courseSectionCollection: ICourseSection[] = [{ id: 10385 }];
      jest.spyOn(courseSectionService, 'query').mockReturnValue(of(new HttpResponse({ body: courseSectionCollection })));
      const additionalCourseSections = [courseSection];
      const expectedCollection: ICourseSection[] = [...additionalCourseSections, ...courseSectionCollection];
      jest.spyOn(courseSectionService, 'addCourseSectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      expect(courseSectionService.query).toHaveBeenCalled();
      expect(courseSectionService.addCourseSectionToCollectionIfMissing).toHaveBeenCalledWith(
        courseSectionCollection,
        ...additionalCourseSections.map(expect.objectContaining),
      );
      expect(comp.courseSectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const attendance: IAttendance = { id: 456 };
      const teacher: IUser = { id: 15485 };
      attendance.teacher = teacher;

      const userCollection: IUser[] = [{ id: 23906 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [teacher];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const attendance: IAttendance = { id: 456 };
      const student: IStudent = { id: 21342 };
      attendance.student = student;
      const lesson: ILesson = { id: 9575 };
      attendance.lesson = lesson;
      const course: ICourse = { id: 24477 };
      attendance.course = course;
      const courseSection: ICourseSection = { id: 8291 };
      attendance.courseSection = courseSection;
      const teacher: IUser = { id: 26992 };
      attendance.teacher = teacher;

      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.lessonsSharedCollection).toContain(lesson);
      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.courseSectionsSharedCollection).toContain(courseSection);
      expect(comp.usersSharedCollection).toContain(teacher);
      expect(comp.attendance).toEqual(attendance);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttendance>>();
      const attendance = { id: 123 };
      jest.spyOn(attendanceFormService, 'getAttendance').mockReturnValue(attendance);
      jest.spyOn(attendanceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attendance }));
      saveSubject.complete();

      // THEN
      expect(attendanceFormService.getAttendance).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(attendanceService.update).toHaveBeenCalledWith(expect.objectContaining(attendance));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttendance>>();
      const attendance = { id: 123 };
      jest.spyOn(attendanceFormService, 'getAttendance').mockReturnValue({ id: null });
      jest.spyOn(attendanceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attendance: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attendance }));
      saveSubject.complete();

      // THEN
      expect(attendanceFormService.getAttendance).toHaveBeenCalled();
      expect(attendanceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttendance>>();
      const attendance = { id: 123 };
      jest.spyOn(attendanceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attendance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(attendanceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudent', () => {
      it('Should forward to studentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLesson', () => {
      it('Should forward to lessonService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(lessonService, 'compareLesson');
        comp.compareLesson(entity, entity2);
        expect(lessonService.compareLesson).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCourse', () => {
      it('Should forward to courseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCourseSection', () => {
      it('Should forward to courseSectionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseSectionService, 'compareCourseSection');
        comp.compareCourseSection(entity, entity2);
        expect(courseSectionService.compareCourseSection).toHaveBeenCalledWith(entity, entity2);
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
  });
});
