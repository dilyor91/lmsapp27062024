import dayjs from 'dayjs/esm';

import { IActivity, NewActivity } from './activity.model';

export const sampleWithRequiredData: IActivity = {
  id: 17236,
};

export const sampleWithPartialData: IActivity = {
  id: 2733,
};

export const sampleWithFullData: IActivity = {
  id: 29422,
  activityDate: dayjs('2024-11-10T23:51'),
};

export const sampleWithNewData: NewActivity = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
