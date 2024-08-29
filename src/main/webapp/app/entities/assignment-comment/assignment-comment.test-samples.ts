import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 25185,
  comment: 'given',
  commentDate: dayjs('2024-07-11T20:02'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 28603,
  comment: 'wooden toward',
  commentDate: dayjs('2024-07-11T23:55'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 1066,
  comment: 'provided like madly',
  commentDate: dayjs('2024-07-12T03:56'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'ripe but',
  commentDate: dayjs('2024-07-11T15:32'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
