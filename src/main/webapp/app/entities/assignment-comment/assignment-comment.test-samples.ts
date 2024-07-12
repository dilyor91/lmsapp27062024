import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 25709,
  comment: 'runway past',
  commentDate: dayjs('2024-07-12T02:04'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 3627,
  comment: 'greatly',
  commentDate: dayjs('2024-07-12T05:20'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 14404,
  comment: 'seep wrathful',
  commentDate: dayjs('2024-07-11T20:30'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'to anenst rate',
  commentDate: dayjs('2024-07-11T12:56'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
