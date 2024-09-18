import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 3619,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 24225,
  title: 'silly at besides',
  startTime: 23172,
  endTime: 10864,
  eventFrequency: 'NOREPEAT',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 4441,
  title: 'illustrious',
  content: 'despite whose even',
  date: dayjs('2024-06-27T03:44'),
  startTime: 2105,
  endTime: 8625,
  location: 'cheerful',
  address: 'suture majestic',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
