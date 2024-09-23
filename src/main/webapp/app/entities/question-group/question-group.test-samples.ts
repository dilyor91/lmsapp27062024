import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 28263,
  name: 'gosh sturdy',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 29805,
  name: 'plus now stale',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 10054,
  name: 'whoa a degenerate',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'testing whoa throughout',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
