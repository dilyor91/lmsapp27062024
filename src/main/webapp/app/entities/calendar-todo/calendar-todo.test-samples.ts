import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 25273,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 4462,
};

export const sampleWithFullData: ICalendarTodo = {
  id: 24894,
  title: 'oh',
  date: dayjs('2024-08-29T03:55'),
  time: 'where',
  details: 'silky whoever',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
