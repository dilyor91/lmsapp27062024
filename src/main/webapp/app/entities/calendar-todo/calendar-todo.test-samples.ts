import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 26031,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 19932,
  title: 'widen very flub',
  details: 'cuddly',
};

export const sampleWithFullData: ICalendarTodo = {
  id: 17538,
  title: 'consequently woot per',
  date: dayjs('2024-08-28T18:55'),
  time: 'concerning',
  details: 'monasticism',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
