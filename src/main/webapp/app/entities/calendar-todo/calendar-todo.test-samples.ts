import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 18611,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 22338,
  title: 'vain',
};

export const sampleWithFullData: ICalendarTodo = {
  id: 8279,
  title: 'warped',
  date: dayjs('2024-08-29T03:45'),
  time: 'than chasuble',
  details: 'lest',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
