import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 28628,
  name: 'respectful bah inasmuch',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 31722,
  name: 'froth',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 26031,
  name: 'draught pro why',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'lest um and',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
