import dayjs from 'dayjs/esm';

import { ICalendarEvent, NewCalendarEvent } from './calendar-event.model';

export const sampleWithRequiredData: ICalendarEvent = {
  id: 654,
};

export const sampleWithPartialData: ICalendarEvent = {
  id: 6294,
  title: 'brr yowza fatally',
  content: 'ha far',
  startTime: 3773,
  address: 'gazebo meanwhile gadzooks',
  eventFrequency: 'WEEKLY',
};

export const sampleWithFullData: ICalendarEvent = {
  id: 17791,
  title: 'almighty apud',
  content: 'frizz blissfully unhappy',
  date: dayjs('2024-06-27T03:18'),
  startTime: 20386,
  endTime: 20934,
  location: 'officially',
  address: 'nippy about frightfully',
  eventFrequency: 'WEEKLY',
};

export const sampleWithNewData: NewCalendarEvent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
