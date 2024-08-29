import dayjs from 'dayjs/esm';

import { ICalendarTodo, NewCalendarTodo } from './calendar-todo.model';

export const sampleWithRequiredData: ICalendarTodo = {
  id: 5609,
};

export const sampleWithPartialData: ICalendarTodo = {
  id: 1822,
  date: dayjs('2024-08-29T05:49'),
};

export const sampleWithFullData: ICalendarTodo = {
  id: 21143,
  title: 'finally',
  date: dayjs('2024-08-29T05:30'),
  time: 'frank who',
  details: 'outside',
};

export const sampleWithNewData: NewCalendarTodo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
