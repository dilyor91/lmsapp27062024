import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 30142,
  comment: 'bidet strict tarry',
  commentDate: dayjs('2024-07-11T07:42'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 29014,
  comment: 'repentant gleefully parched',
  commentDate: dayjs('2024-07-12T02:03'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 7636,
  comment: 'following adrenalin hence',
  commentDate: dayjs('2024-07-11T07:39'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'seriously address',
  commentDate: dayjs('2024-07-11T20:16'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
