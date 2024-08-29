import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 15347,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 12868,
  content: 'more pristine',
  date: dayjs('2024-06-27T05:44'),
  endTime: 3246,
};

export const sampleWithFullData: ICalendarEvent = {
  id: 22418,
  title: 'incidentally',
  content: 'lot what boohoo',
  date: dayjs('2024-06-27T03:47'),
  startTime: 23542,
  endTime: 13242,
  location: 'dimpled exhale important',
  address: 'infatuated',
  eventFrequency: 'WEEKLY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
