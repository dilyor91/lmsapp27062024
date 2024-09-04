import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 3114,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 8875,
  date: dayjs('2024-06-26T18:36'),
  startTime: 17260,
  endTime: 10994,
  location: 'irritating',
  address: 'deliberately wrong',
  eventFrequency: 'WEEKLY',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 16413,
  title: 'provided beginner boon',
  content: 'ash given',
  date: dayjs('2024-06-26T08:56'),
  startTime: 21945,
  endTime: 11286,
  location: 'detailed',
  address: 'hippopotamus furthermore might',
  eventFrequency: 'WEEKLY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
