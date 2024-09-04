import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 25353,
  comment: 'hm in realistic',
  commentDate: dayjs('2024-07-12T06:36'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 16125,
  comment: 'supposing aware mid',
  commentDate: dayjs('2024-07-11T14:38'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 6284,
  comment: 'rotten rude',
  commentDate: dayjs('2024-07-11T08:11'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'yippee',
  commentDate: dayjs('2024-07-11T13:00'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
