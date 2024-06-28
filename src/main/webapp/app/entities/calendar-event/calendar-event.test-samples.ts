import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 5144,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 4125,
  content: 'whoever meh',
  date: dayjs('2024-06-26T17:22'),
};

export const sampleWithFullData: ICalendarEvent = {
  id: 1358,
  title: 'provision mid until',
  content: 'hail that sans',
  date: dayjs('2024-06-26T07:15'),
  startTime: 9524,
  endTime: 2987,
  location: 'before',
  address: 'contrail',
  eventFrequency: 'DAILY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
