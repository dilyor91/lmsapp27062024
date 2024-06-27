import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 5113,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 10621,
  title: 'yahoo astride',
  startTime: 8355,
  location: 'frenetically near ouch',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 1889,
  title: 'zipper inferior phooey',
  content: 'essence as',
  date: dayjs('2024-06-26T23:54'),
  startTime: 30745,
  endTime: 24064,
  location: 'aw ornery than',
  address: 'unto stylish',
  eventFrequency: 'NOREPEAT',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
