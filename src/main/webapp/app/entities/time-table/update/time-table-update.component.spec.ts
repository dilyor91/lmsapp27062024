import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { IBuilding } from 'app/entities/building/building.model';
import { BuildingService } from 'app/entities/building/service/building.service';
import { IRoom } from 'app/entities/room/room.model';
import { RoomService } from 'app/entities/room/service/room.service';
import { IStudyTerm } from 'app/entities/study-term/study-term.model';
import { StudyTermService } from 'app/entities/study-term/service/study-term.service';
import { ITimeTable } from '../time-table.model';
import { TimeTableService } from '../service/time-table.service';
import { TimeTableFormService } from './time-table-form.service';

import { TimeTableUpdateComponent } from './time-table-update.component';

describe('TimeTable Management Update Component', () => {
  let comp: TimeTableUpdateComponent;
  let fixture: ComponentFixture<TimeTableUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let timeTableFormService: TimeTableFormService;
  let timeTableService: TimeTableService;
  let courseService: CourseService;
  let teacherService: TeacherService;
  let buildingService: BuildingService;
  let roomService: RoomService;
  let studyTermService: StudyTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimeTableUpdateComponent],
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
      .overrideTemplate(TimeTableUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TimeTableUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    timeTableFormService = TestBed.inject(TimeTableFormService);
    timeTableService = TestBed.inject(TimeTableService);
    courseService = TestBed.inject(CourseService);
    teacherService = TestBed.inject(TeacherService);
    buildingService = TestBed.inject(BuildingService);
    roomService = TestBed.inject(RoomService);
    studyTermService = TestBed.inject(StudyTermService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const timeTable: ITimeTable = { id: 456 };
      const course: ICourse = { id: 5341 };
      timeTable.course = course;

      const courseCollection: ICourse[] = [{ id: 22286 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Teacher query and add missing value', () => {
      const timeTable: ITimeTable = { id: 456 };
      const teacher: ITeacher = { id: 2940 };
      timeTable.teacher = teacher;

      const teacherCollection: ITeacher[] = [{ id: 16751 }];
      jest.spyOn(teacherService, 'query').mockReturnValue(of(new HttpResponse({ body: teacherCollection })));
      const additionalTeachers = [teacher];
      const expectedCollection: ITeacher[] = [...additionalTeachers, ...teacherCollection];
      jest.spyOn(teacherService, 'addTeacherToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(teacherService.query).toHaveBeenCalled();
      expect(teacherService.addTeacherToCollectionIfMissing).toHaveBeenCalledWith(
        teacherCollection,
        ...additionalTeachers.map(expect.objectContaining),
      );
      expect(comp.teachersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Building query and add missing value', () => {
      const timeTable: ITimeTable = { id: 456 };
      const building: IBuilding = { id: 30157 };
      timeTable.building = building;

      const buildingCollection: IBuilding[] = [{ id: 12662 }];
      jest.spyOn(buildingService, 'query').mockReturnValue(of(new HttpResponse({ body: buildingCollection })));
      const additionalBuildings = [building];
      const expectedCollection: IBuilding[] = [...additionalBuildings, ...buildingCollection];
      jest.spyOn(buildingService, 'addBuildingToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(buildingService.query).toHaveBeenCalled();
      expect(buildingService.addBuildingToCollectionIfMissing).toHaveBeenCalledWith(
        buildingCollection,
        ...additionalBuildings.map(expect.objectContaining),
      );
      expect(comp.buildingsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Room query and add missing value', () => {
      const timeTable: ITimeTable = { id: 456 };
      const room: IRoom = { id: 31938 };
      timeTable.room = room;

      const roomCollection: IRoom[] = [{ id: 5763 }];
      jest.spyOn(roomService, 'query').mockReturnValue(of(new HttpResponse({ body: roomCollection })));
      const additionalRooms = [room];
      const expectedCollection: IRoom[] = [...additionalRooms, ...roomCollection];
      jest.spyOn(roomService, 'addRoomToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(roomService.query).toHaveBeenCalled();
      expect(roomService.addRoomToCollectionIfMissing).toHaveBeenCalledWith(
        roomCollection,
        ...additionalRooms.map(expect.objectContaining),
      );
      expect(comp.roomsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StudyTerm query and add missing value', () => {
      const timeTable: ITimeTable = { id: 456 };
      const studyTerm: IStudyTerm = { id: 4999 };
      timeTable.studyTerm = studyTerm;

      const studyTermCollection: IStudyTerm[] = [{ id: 21580 }];
      jest.spyOn(studyTermService, 'query').mockReturnValue(of(new HttpResponse({ body: studyTermCollection })));
      const additionalStudyTerms = [studyTerm];
      const expectedCollection: IStudyTerm[] = [...additionalStudyTerms, ...studyTermCollection];
      jest.spyOn(studyTermService, 'addStudyTermToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(studyTermService.query).toHaveBeenCalled();
      expect(studyTermService.addStudyTermToCollectionIfMissing).toHaveBeenCalledWith(
        studyTermCollection,
        ...additionalStudyTerms.map(expect.objectContaining),
      );
      expect(comp.studyTermsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const timeTable: ITimeTable = { id: 456 };
      const course: ICourse = { id: 28191 };
      timeTable.course = course;
      const teacher: ITeacher = { id: 2381 };
      timeTable.teacher = teacher;
      const building: IBuilding = { id: 12297 };
      timeTable.building = building;
      const room: IRoom = { id: 20986 };
      timeTable.room = room;
      const studyTerm: IStudyTerm = { id: 356 };
      timeTable.studyTerm = studyTerm;

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.teachersSharedCollection).toContain(teacher);
      expect(comp.buildingsSharedCollection).toContain(building);
      expect(comp.roomsSharedCollection).toContain(room);
      expect(comp.studyTermsSharedCollection).toContain(studyTerm);
      expect(comp.timeTable).toEqual(timeTable);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITimeTable>>();
      const timeTable = { id: 123 };
      jest.spyOn(timeTableFormService, 'getTimeTable').mockReturnValue(timeTable);
      jest.spyOn(timeTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: timeTable }));
      saveSubject.complete();

      // THEN
      expect(timeTableFormService.getTimeTable).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(timeTableService.update).toHaveBeenCalledWith(expect.objectContaining(timeTable));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITimeTable>>();
      const timeTable = { id: 123 };
      jest.spyOn(timeTableFormService, 'getTimeTable').mockReturnValue({ id: null });
      jest.spyOn(timeTableService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ timeTable: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: timeTable }));
      saveSubject.complete();

      // THEN
      expect(timeTableFormService.getTimeTable).toHaveBeenCalled();
      expect(timeTableService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITimeTable>>();
      const timeTable = { id: 123 };
      jest.spyOn(timeTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(timeTableService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourse', () => {
      it('Should forward to courseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareBuilding', () => {
      it('Should forward to buildingService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(buildingService, 'compareBuilding');
        comp.compareBuilding(entity, entity2);
        expect(buildingService.compareBuilding).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRoom', () => {
      it('Should forward to roomService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(roomService, 'compareRoom');
        comp.compareRoom(entity, entity2);
        expect(roomService.compareRoom).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareStudyTerm', () => {
      it('Should forward to studyTermService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studyTermService, 'compareStudyTerm');
        comp.compareStudyTerm(entity, entity2);
        expect(studyTermService.compareStudyTerm).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
