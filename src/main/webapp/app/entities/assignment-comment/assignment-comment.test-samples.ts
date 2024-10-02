import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 9085,
  comment: 'why through through',
  commentDate: dayjs('2024-07-12T05:19'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 3847,
  comment: 'once',
  commentDate: dayjs('2024-07-11T09:25'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 13045,
  comment: 'next',
  commentDate: dayjs('2024-07-12T04:47'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'engage miserable up',
  commentDate: dayjs('2024-07-11T15:31'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
