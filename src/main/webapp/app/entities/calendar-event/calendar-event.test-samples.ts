import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 7972,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 20873,
  date: dayjs('2024-06-26T17:04'),
  address: 'after',
  eventFrequency: 'WEEKLY',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 4899,
  title: 'which',
  content: 'miserably',
  date: dayjs('2024-06-27T02:42'),
  startTime: 24289,
  endTime: 17803,
  location: 'but unabashedly',
  address: 'dimly lined reassuringly',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
