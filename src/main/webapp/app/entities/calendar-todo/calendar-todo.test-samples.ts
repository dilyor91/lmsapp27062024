import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 5325,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 10647,
  title: 'ultimate essence',
  time: 'beside harp valuable',
};

export const sampleWithFullData: ICalendarTodo = {
  id: 25380,
  title: 'boo upwardly',
  date: dayjs('2024-08-28T20:40'),
  time: 'obnoxiously likely',
  details: 'ouch',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
