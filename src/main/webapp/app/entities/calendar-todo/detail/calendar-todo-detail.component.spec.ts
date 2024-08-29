import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CalendarTodoDetailComponent } from './calendar-todo-detail.component';

describe('CalendarTodo Management Detail Component', () => {
  let comp: CalendarTodoDetailComponent;
  let fixture: ComponentFixture<CalendarTodoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarTodoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./calendar-todo-detail.component').then(m => m.CalendarTodoDetailComponent),
              resolve: { calendarTodo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CalendarTodoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTodoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load calendarTodo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CalendarTodoDetailComponent);

      // THEN
      expect(instance.calendarTodo()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
