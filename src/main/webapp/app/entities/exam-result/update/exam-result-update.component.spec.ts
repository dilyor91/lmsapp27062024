import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IExam } from 'app/entities/exam/exam.model';
import { ExamService } from 'app/entities/exam/service/exam.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IExamResult } from '../exam-result.model';
import { ExamResultService } from '../service/exam-result.service';
import { ExamResultFormService } from './exam-result-form.service';

import { ExamResultUpdateComponent } from './exam-result-update.component';

describe('ExamResult Management Update Component', () => {
  let comp: ExamResultUpdateComponent;
  let fixture: ComponentFixture<ExamResultUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let examResultFormService: ExamResultFormService;
  let examResultService: ExamResultService;
  let studentService: StudentService;
  let examService: ExamService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExamResultUpdateComponent],
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
      .overrideTemplate(ExamResultUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExamResultUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    examResultFormService = TestBed.inject(ExamResultFormService);
    examResultService = TestBed.inject(ExamResultService);
    studentService = TestBed.inject(StudentService);
    examService = TestBed.inject(ExamService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Student query and add missing value', () => {
      const examResult: IExamResult = { id: 456 };
      const student: IStudent = { id: 13107 };
      examResult.student = student;

      const studentCollection: IStudent[] = [{ id: 12866 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ examResult });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Exam query and add missing value', () => {
      const examResult: IExamResult = { id: 456 };
      const exam: IExam = { id: 22323 };
      examResult.exam = exam;

      const examCollection: IExam[] = [{ id: 8293 }];
      jest.spyOn(examService, 'query').mockReturnValue(of(new HttpResponse({ body: examCollection })));
      const additionalExams = [exam];
      const expectedCollection: IExam[] = [...additionalExams, ...examCollection];
      jest.spyOn(examService, 'addExamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ examResult });
      comp.ngOnInit();

      expect(examService.query).toHaveBeenCalled();
      expect(examService.addExamToCollectionIfMissing).toHaveBeenCalledWith(
        examCollection,
        ...additionalExams.map(expect.objectContaining),
      );
      expect(comp.examsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const examResult: IExamResult = { id: 456 };
      const course: ICourse = { id: 31369 };
      examResult.course = course;

      const courseCollection: ICourse[] = [{ id: 3929 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ examResult });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const examResult: IExamResult = { id: 456 };
      const student: IStudent = { id: 18826 };
      examResult.student = student;
      const exam: IExam = { id: 2439 };
      examResult.exam = exam;
      const course: ICourse = { id: 28272 };
      examResult.course = course;

      activatedRoute.data = of({ examResult });
      comp.ngOnInit();

      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.examsSharedCollection).toContain(exam);
      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.examResult).toEqual(examResult);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExamResult>>();
      const examResult = { id: 123 };
      jest.spyOn(examResultFormService, 'getExamResult').mockReturnValue(examResult);
      jest.spyOn(examResultService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ examResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: examResult }));
      saveSubject.complete();

      // THEN
      expect(examResultFormService.getExamResult).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(examResultService.update).toHaveBeenCalledWith(expect.objectContaining(examResult));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExamResult>>();
      const examResult = { id: 123 };
      jest.spyOn(examResultFormService, 'getExamResult').mockReturnValue({ id: null });
      jest.spyOn(examResultService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ examResult: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: examResult }));
      saveSubject.complete();

      // THEN
      expect(examResultFormService.getExamResult).toHaveBeenCalled();
      expect(examResultService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExamResult>>();
      const examResult = { id: 123 };
      jest.spyOn(examResultService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ examResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(examResultService.update).toHaveBeenCalled();
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

    describe('compareExam', () => {
      it('Should forward to examService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(examService, 'compareExam');
        comp.compareExam(entity, entity2);
        expect(examService.compareExam).toHaveBeenCalledWith(entity, entity2);
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
  });
});
