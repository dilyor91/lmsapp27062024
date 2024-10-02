import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 27726,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 18567,
  date: dayjs('2024-08-29T04:58'),
  time: 'whether carelessly and',
};

export const sampleWithFullData: ICalendarTodo = {
  id: 10164,
  title: 'equally',
  date: dayjs('2024-08-29T02:30'),
  time: 'ick bleak',
  details: 'miserable midst deserted',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
