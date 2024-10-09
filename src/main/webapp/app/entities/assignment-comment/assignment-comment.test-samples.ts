import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 29621,
  comment: 'impanel testify yet',
  commentDate: dayjs('2024-07-11T09:54'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 30647,
  comment: 'eek rigidly',
  commentDate: dayjs('2024-07-11T20:14'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 21205,
  comment: 'ick likely',
  commentDate: dayjs('2024-07-11T13:44'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'so bump miserably',
  commentDate: dayjs('2024-07-11T17:12'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
