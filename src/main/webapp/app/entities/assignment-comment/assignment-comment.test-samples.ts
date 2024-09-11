import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 30677,
  comment: 'well-to-do fooey',
  commentDate: dayjs('2024-07-11T10:26'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 26454,
  comment: 'meaty onto mask',
  commentDate: dayjs('2024-07-11T16:56'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 17363,
  comment: 'excluding hm ordinary',
  commentDate: dayjs('2024-07-12T02:06'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'score topsail likewise',
  commentDate: dayjs('2024-07-11T22:16'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
