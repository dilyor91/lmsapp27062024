import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 1687,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 31421,
  content: 'amongst',
  date: dayjs('2024-06-26T10:39'),
  startTime: 6371,
  endTime: 23754,
  eventFrequency: 'DAILY',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 17742,
  title: 'unaware',
  content: 'at',
  date: dayjs('2024-06-27T05:14'),
  startTime: 5232,
  endTime: 11626,
  location: 'who yuck quick-witted',
  address: 'nor notwithstanding modulo',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
