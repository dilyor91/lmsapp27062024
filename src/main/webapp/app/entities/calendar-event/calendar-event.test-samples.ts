import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 2690,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 15944,
  title: 'sans until mmm',
  date: dayjs('2024-06-26T22:41'),
  endTime: 17022,
};

export const sampleWithFullData: ICalendarEvent = {
  id: 10614,
  title: 'acquisition gossip usually',
  content: 'mailing scratch',
  date: dayjs('2024-06-27T00:52'),
  startTime: 32300,
  endTime: 20438,
  location: 'hm',
  address: 'cappelletti doe of',
  eventFrequency: 'DAILY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
