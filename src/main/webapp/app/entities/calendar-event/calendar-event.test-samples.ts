import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 18963,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 17264,
  date: dayjs('2024-06-26T14:50'),
  startTime: 23835,
  endTime: 12105,
  address: 'exhilarate',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 6346,
  title: 'boohoo hungrily',
  content: 'finally colt defiantly',
  date: dayjs('2024-06-26T07:37'),
  startTime: 25484,
  endTime: 18929,
  location: 'urgently itchy cheater',
  address: 'a or',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
