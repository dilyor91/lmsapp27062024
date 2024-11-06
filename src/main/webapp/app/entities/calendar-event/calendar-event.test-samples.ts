import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 14635,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 27885,
  title: 'quadruple vibrant till',
  content: 'order',
  startTime: 14743,
  endTime: 9958,
  eventFrequency: 'NOREPEAT',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 10492,
  title: 'inwardly oh',
  content: 'once unearth apud',
  date: dayjs('2024-06-27T01:50'),
  startTime: 536,
  endTime: 25344,
  location: 'personal',
  address: 'swiftly consequently',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
