import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 26823,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 4151,
  content: 'cutover um',
  startTime: 23190,
  endTime: 1971,
};

export const sampleWithFullData: ICalendarEvent = {
  id: 2939,
  title: 'frenetically beneath only',
  content: 'suddenly',
  date: dayjs('2024-06-27T02:48'),
  startTime: 15866,
  endTime: 29618,
  location: 'stranger than perfectly',
  address: 'anxiously likewise essential',
  eventFrequency: 'DAILY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
