import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 24613,
  comment: 'more curiously overcook',
  commentDate: dayjs('2024-07-11T08:09'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 18760,
  comment: 'ambitious meh',
  commentDate: dayjs('2024-07-12T02:34'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 27670,
  comment: 'hydrant',
  commentDate: dayjs('2024-07-11T15:38'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'slowly freely',
  commentDate: dayjs('2024-07-12T00:21'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
