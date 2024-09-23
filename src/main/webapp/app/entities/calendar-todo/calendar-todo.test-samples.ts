import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 20238,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 31947,
  title: 'moral madly serialize',
  date: dayjs('2024-08-28T10:08'),
  time: 'consequently',
};

export const sampleWithFullData: ICalendarTodo = {
  id: 16329,
  title: 'fireplace',
  date: dayjs('2024-08-28T11:12'),
  time: 'meanwhile forceful jellyfish',
  details: 'mostly gloss marimba',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
