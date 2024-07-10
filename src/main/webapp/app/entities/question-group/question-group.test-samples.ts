import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 32615,
  name: 'inside intensely pub',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 5112,
  name: 'furthermore monthly',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 3413,
  name: 'guide rectangle forceful',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'geez whoa',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
