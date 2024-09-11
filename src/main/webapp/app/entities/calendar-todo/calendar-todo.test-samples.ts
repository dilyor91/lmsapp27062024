import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 18966,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 2440,
  title: 'mmm gracefully nor',
  date: dayjs('2024-08-29T01:24'),
};

export const sampleWithFullData: ICalendarTodo = {
  id: 24683,
  title: 'of psst er',
  date: dayjs('2024-08-29T05:26'),
  time: 'gadzooks',
  details: 'briskly knowingly',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
