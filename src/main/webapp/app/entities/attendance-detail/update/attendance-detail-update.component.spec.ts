import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAttendance } from 'app/entities/attendance/attendance.model';
import { AttendanceService } from 'app/entities/attendance/service/attendance.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IAttendanceDetail } from '../attendance-detail.model';
import { AttendanceDetailService } from '../service/attendance-detail.service';
import { AttendanceDetailFormService } from './attendance-detail-form.service';

import { AttendanceDetailUpdateComponent } from './attendance-detail-update.component';

describe('AttendanceDetail Management Update Component', () => {
  let comp: AttendanceDetailUpdateComponent;
  let fixture: ComponentFixture<AttendanceDetailUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let attendanceDetailFormService: AttendanceDetailFormService;
  let attendanceDetailService: AttendanceDetailService;
  let attendanceService: AttendanceService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AttendanceDetailUpdateComponent],
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
      .overrideTemplate(AttendanceDetailUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AttendanceDetailUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    attendanceDetailFormService = TestBed.inject(AttendanceDetailFormService);
    attendanceDetailService = TestBed.inject(AttendanceDetailService);
    attendanceService = TestBed.inject(AttendanceService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Attendance query and add missing value', () => {
      const attendanceDetail: IAttendanceDetail = { id: 456 };
      const attendance: IAttendance = { id: 38 };
      attendanceDetail.attendance = attendance;

      const attendanceCollection: IAttendance[] = [{ id: 31729 }];
      jest.spyOn(attendanceService, 'query').mockReturnValue(of(new HttpResponse({ body: attendanceCollection })));
      const additionalAttendances = [attendance];
      const expectedCollection: IAttendance[] = [...additionalAttendances, ...attendanceCollection];
      jest.spyOn(attendanceService, 'addAttendanceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendanceDetail });
      comp.ngOnInit();

      expect(attendanceService.query).toHaveBeenCalled();
      expect(attendanceService.addAttendanceToCollectionIfMissing).toHaveBeenCalledWith(
        attendanceCollection,
        ...additionalAttendances.map(expect.objectContaining),
      );
      expect(comp.attendancesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call User query and add missing value', () => {
      const attendanceDetail: IAttendanceDetail = { id: 456 };
      const student: IUser = { id: 15061 };
      attendanceDetail.student = student;

      const userCollection: IUser[] = [{ id: 28479 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [student];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ attendanceDetail });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const attendanceDetail: IAttendanceDetail = { id: 456 };
      const attendance: IAttendance = { id: 11311 };
      attendanceDetail.attendance = attendance;
      const student: IUser = { id: 10326 };
      attendanceDetail.student = student;

      activatedRoute.data = of({ attendanceDetail });
      comp.ngOnInit();

      expect(comp.attendancesSharedCollection).toContain(attendance);
      expect(comp.usersSharedCollection).toContain(student);
      expect(comp.attendanceDetail).toEqual(attendanceDetail);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttendanceDetail>>();
      const attendanceDetail = { id: 123 };
      jest.spyOn(attendanceDetailFormService, 'getAttendanceDetail').mockReturnValue(attendanceDetail);
      jest.spyOn(attendanceDetailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attendanceDetail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attendanceDetail }));
      saveSubject.complete();

      // THEN
      expect(attendanceDetailFormService.getAttendanceDetail).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(attendanceDetailService.update).toHaveBeenCalledWith(expect.objectContaining(attendanceDetail));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttendanceDetail>>();
      const attendanceDetail = { id: 123 };
      jest.spyOn(attendanceDetailFormService, 'getAttendanceDetail').mockReturnValue({ id: null });
      jest.spyOn(attendanceDetailService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attendanceDetail: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: attendanceDetail }));
      saveSubject.complete();

      // THEN
      expect(attendanceDetailFormService.getAttendanceDetail).toHaveBeenCalled();
      expect(attendanceDetailService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAttendanceDetail>>();
      const attendanceDetail = { id: 123 };
      jest.spyOn(attendanceDetailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ attendanceDetail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(attendanceDetailService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAttendance', () => {
      it('Should forward to attendanceService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(attendanceService, 'compareAttendance');
        comp.compareAttendance(entity, entity2);
        expect(attendanceService.compareAttendance).toHaveBeenCalledWith(entity, entity2);
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
