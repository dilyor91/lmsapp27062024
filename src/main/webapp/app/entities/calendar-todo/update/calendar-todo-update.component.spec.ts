import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { CalendarTodoService } from '../service/calendar-todo.service';
import { ICalendarTodo } from '../calendar-todo.model';
import { CalendarTodoFormService } from './calendar-todo-form.service';

import { CalendarTodoUpdateComponent } from './calendar-todo-update.component';

describe('CalendarTodo Management Update Component', () => {
  let comp: CalendarTodoUpdateComponent;
  let fixture: ComponentFixture<CalendarTodoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let calendarTodoFormService: CalendarTodoFormService;
  let calendarTodoService: CalendarTodoService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalendarTodoUpdateComponent],
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
      .overrideTemplate(CalendarTodoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CalendarTodoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    calendarTodoFormService = TestBed.inject(CalendarTodoFormService);
    calendarTodoService = TestBed.inject(CalendarTodoService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const calendarTodo: ICalendarTodo = { id: 456 };
      const user: IUser = { id: 4916 };
      calendarTodo.user = user;

      const userCollection: IUser[] = [{ id: 4511 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ calendarTodo });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const calendarTodo: ICalendarTodo = { id: 456 };
      const user: IUser = { id: 11863 };
      calendarTodo.user = user;

      activatedRoute.data = of({ calendarTodo });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.calendarTodo).toEqual(calendarTodo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICalendarTodo>>();
      const calendarTodo = { id: 123 };
      jest.spyOn(calendarTodoFormService, 'getCalendarTodo').mockReturnValue(calendarTodo);
      jest.spyOn(calendarTodoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ calendarTodo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: calendarTodo }));
      saveSubject.complete();

      // THEN
      expect(calendarTodoFormService.getCalendarTodo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(calendarTodoService.update).toHaveBeenCalledWith(expect.objectContaining(calendarTodo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICalendarTodo>>();
      const calendarTodo = { id: 123 };
      jest.spyOn(calendarTodoFormService, 'getCalendarTodo').mockReturnValue({ id: null });
      jest.spyOn(calendarTodoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ calendarTodo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: calendarTodo }));
      saveSubject.complete();

      // THEN
      expect(calendarTodoFormService.getCalendarTodo).toHaveBeenCalled();
      expect(calendarTodoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICalendarTodo>>();
      const calendarTodo = { id: 123 };
      jest.spyOn(calendarTodoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ calendarTodo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(calendarTodoService.update).toHaveBeenCalled();
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
  });
});
