import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 2144,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 25069,
  startTime: 11268,
  location: 'towel tooth',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 13220,
  title: 'calculating prisoner opposite',
  content: 'bossy commonly',
  date: dayjs('2024-06-26T18:53'),
  startTime: 27663,
  endTime: 19022,
  location: 'beneath hence',
  address: 'boo till onto',
  eventFrequency: 'WEEKLY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
