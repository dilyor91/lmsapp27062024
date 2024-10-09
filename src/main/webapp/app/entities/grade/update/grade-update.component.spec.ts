import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { SubmissionAssignmentService } from 'app/entities/submission-assignment/service/submission-assignment.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IGrade } from '../grade.model';
import { GradeService } from '../service/grade.service';
import { GradeFormService } from './grade-form.service';

import { GradeUpdateComponent } from './grade-update.component';

describe('Grade Management Update Component', () => {
  let comp: GradeUpdateComponent;
  let fixture: ComponentFixture<GradeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let gradeFormService: GradeFormService;
  let gradeService: GradeService;
  let submissionAssignmentService: SubmissionAssignmentService;
  let teacherService: TeacherService;
  let assignmentService: AssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GradeUpdateComponent],
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
      .overrideTemplate(GradeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GradeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    gradeFormService = TestBed.inject(GradeFormService);
    gradeService = TestBed.inject(GradeService);
    submissionAssignmentService = TestBed.inject(SubmissionAssignmentService);
    teacherService = TestBed.inject(TeacherService);
    assignmentService = TestBed.inject(AssignmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call submissionAssignment query and add missing value', () => {
      const grade: IGrade = { id: 456 };
      const submissionAssignment: ISubmissionAssignment = { id: 14939 };
      grade.submissionAssignment = submissionAssignment;

      const submissionAssignmentCollection: ISubmissionAssignment[] = [{ id: 19683 }];
      jest.spyOn(submissionAssignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: submissionAssignmentCollection })));
      const expectedCollection: ISubmissionAssignment[] = [submissionAssignment, ...submissionAssignmentCollection];
      jest.spyOn(submissionAssignmentService, 'addSubmissionAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(submissionAssignmentService.query).toHaveBeenCalled();
      expect(submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        submissionAssignmentCollection,
        submissionAssignment,
      );
      expect(comp.submissionAssignmentsCollection).toEqual(expectedCollection);
    });

    it('Should call Teacher query and add missing value', () => {
      const grade: IGrade = { id: 456 };
      const teacher: ITeacher = { id: 21512 };
      grade.teacher = teacher;

      const teacherCollection: ITeacher[] = [{ id: 13272 }];
      jest.spyOn(teacherService, 'query').mockReturnValue(of(new HttpResponse({ body: teacherCollection })));
      const additionalTeachers = [teacher];
      const expectedCollection: ITeacher[] = [...additionalTeachers, ...teacherCollection];
      jest.spyOn(teacherService, 'addTeacherToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(teacherService.query).toHaveBeenCalled();
      expect(teacherService.addTeacherToCollectionIfMissing).toHaveBeenCalledWith(
        teacherCollection,
        ...additionalTeachers.map(expect.objectContaining),
      );
      expect(comp.teachersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assignment query and add missing value', () => {
      const grade: IGrade = { id: 456 };
      const assignment: IAssignment = { id: 2028 };
      grade.assignment = assignment;

      const assignmentCollection: IAssignment[] = [{ id: 11668 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [assignment];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const grade: IGrade = { id: 456 };
      const submissionAssignment: ISubmissionAssignment = { id: 17737 };
      grade.submissionAssignment = submissionAssignment;
      const teacher: ITeacher = { id: 15810 };
      grade.teacher = teacher;
      const assignment: IAssignment = { id: 934 };
      grade.assignment = assignment;

      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      expect(comp.submissionAssignmentsCollection).toContain(submissionAssignment);
      expect(comp.teachersSharedCollection).toContain(teacher);
      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.grade).toEqual(grade);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 123 };
      jest.spyOn(gradeFormService, 'getGrade').mockReturnValue(grade);
      jest.spyOn(gradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grade }));
      saveSubject.complete();

      // THEN
      expect(gradeFormService.getGrade).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(gradeService.update).toHaveBeenCalledWith(expect.objectContaining(grade));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 123 };
      jest.spyOn(gradeFormService, 'getGrade').mockReturnValue({ id: null });
      jest.spyOn(gradeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grade }));
      saveSubject.complete();

      // THEN
      expect(gradeFormService.getGrade).toHaveBeenCalled();
      expect(gradeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrade>>();
      const grade = { id: 123 };
      jest.spyOn(gradeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grade });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(gradeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSubmissionAssignment', () => {
      it('Should forward to submissionAssignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(submissionAssignmentService, 'compareSubmissionAssignment');
        comp.compareSubmissionAssignment(entity, entity2);
        expect(submissionAssignmentService.compareSubmissionAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTeacher', () => {
      it('Should forward to teacherService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teacherService, 'compareTeacher');
        comp.compareTeacher(entity, entity2);
        expect(teacherService.compareTeacher).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAssignment', () => {
      it('Should forward to assignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assignmentService, 'compareAssignment');
        comp.compareAssignment(entity, entity2);
        expect(assignmentService.compareAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
