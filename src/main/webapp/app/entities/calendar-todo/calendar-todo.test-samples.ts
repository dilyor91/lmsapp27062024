import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 28967,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 17959,
  title: 'obnoxiously drat smoothly',
  date: dayjs('2024-08-28T15:17'),
};

export const sampleWithFullData: ICalendarTodo = {
  id: 11667,
  title: 'if above whenever',
  date: dayjs('2024-08-28T09:23'),
  time: 'thigh hasty',
  details: 'recklessly jaggedly haul',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
