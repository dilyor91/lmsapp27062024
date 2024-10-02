import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 19941,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 29155,
  title: 'questioningly',
  content: 'which tail amid',
  date: dayjs('2024-06-27T00:51'),
  startTime: 26837,
  location: 'whether collaborate phew',
  address: 'operating',
  eventFrequency: 'DAILY',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 20082,
  title: 'folklore excepting hence',
  content: 'strictly wonderfully underneath',
  date: dayjs('2024-06-27T01:04'),
  startTime: 23910,
  endTime: 24388,
  location: 'coolly aboard',
  address: 'uh-huh when slope',
  eventFrequency: 'WEEKLY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
