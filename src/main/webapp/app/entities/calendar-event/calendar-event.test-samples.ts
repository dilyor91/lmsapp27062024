import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 18230,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 5823,
  title: 'courageously evenly hastily',
  content: 'complicated austere terribly',
  date: dayjs('2024-06-26T10:08'),
  startTime: 7975,
  address: 'blossom',
  eventFrequency: 'WEEKLY',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 25644,
  title: 'unimpressively wretched',
  content: 'um knowledgeably regret',
  date: dayjs('2024-06-27T05:37'),
  startTime: 10064,
  endTime: 24416,
  location: 'because fooey',
  address: 'twig aircraft as',
  eventFrequency: 'DAILY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
