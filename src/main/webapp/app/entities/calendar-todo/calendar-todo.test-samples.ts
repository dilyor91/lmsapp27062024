import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 11007,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 18695,
  date: dayjs('2024-08-28T20:44'),
  details: 'meanwhile quietly meh',
};

export const sampleWithFullData: ICalendarTodo = {
  id: 22911,
  title: 'as',
  date: dayjs('2024-08-28T14:33'),
  time: 'dizzy meh jolly',
  details: 'ouch decisive aboard',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
