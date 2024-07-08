import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 17463,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 23050,
  title: 'eek windage',
  date: dayjs('2024-06-26T12:01'),
  startTime: 2825,
  endTime: 12403,
  address: 'wrecker',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 22014,
  title: 'ouch',
  content: 'retch huzzah noisily',
  date: dayjs('2024-06-27T00:22'),
  startTime: 29202,
  endTime: 24571,
  location: 'knotty woof gentle',
  address: 'what ticket who',
  eventFrequency: 'DAILY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
