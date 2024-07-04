import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 9854,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 28807,
  title: 'while',
  content: 'minority intently extrapolate',
  endTime: 31785,
  location: 'even like detailed',
  address: 'elegantly buffer psst',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 2919,
  title: 'yuck rumour but',
  content: 'unaccountably research athwart',
  date: dayjs('2024-06-26T06:51'),
  startTime: 24793,
  endTime: 27039,
  location: 'whereas upon',
  address: 'ancient',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
