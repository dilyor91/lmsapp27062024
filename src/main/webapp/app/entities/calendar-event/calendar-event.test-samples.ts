import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 15770,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 26188,
  title: 'appertain abnegate',
  content: 'authentic yahoo',
  date: dayjs('2024-06-26T18:39'),
  endTime: 31960,
  address: 'rundown kindly split',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 23320,
  title: 'homely',
  content: 'request',
  date: dayjs('2024-06-26T09:42'),
  startTime: 22669,
  endTime: 10281,
  location: 'suckle briefly',
  address: 'unless factorize',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
