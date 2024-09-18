import dayjs from 'dayjs/esm';

import { IAssignmentComment, NewAssignmentComment } from './assignment-comment.model';

export const sampleWithRequiredData: IAssignmentComment = {
  id: 1950,
  comment: 'separately pfft yahoo',
  commentDate: dayjs('2024-07-11T11:56'),
};

export const sampleWithPartialData: IAssignmentComment = {
  id: 8073,
  comment: 'relegate',
  commentDate: dayjs('2024-07-12T01:57'),
};

export const sampleWithFullData: IAssignmentComment = {
  id: 13142,
  comment: 'humiliate',
  commentDate: dayjs('2024-07-11T11:26'),
};

export const sampleWithNewData: NewAssignmentComment = {
  comment: 'industry',
  commentDate: dayjs('2024-07-11T14:02'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
