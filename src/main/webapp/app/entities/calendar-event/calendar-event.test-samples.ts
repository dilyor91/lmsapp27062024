import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 17436,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 5083,
  title: 'kaleidoscopic oof',
  content: 'nippy',
  date: dayjs('2024-06-27T03:49'),
  endTime: 30819,
};

export const sampleWithFullData: ICalendarEvent = {
  id: 29669,
  title: 'smoothly',
  content: 'anenst aside',
  date: dayjs('2024-06-26T08:03'),
  startTime: 14736,
  endTime: 22301,
  location: 'joyously how defiantly',
  address: 'truck include miserably',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
