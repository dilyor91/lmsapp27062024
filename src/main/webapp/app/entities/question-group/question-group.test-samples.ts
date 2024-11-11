import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 32230,
  name: 'utterly disclosure',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 29697,
  name: 'meager',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 238,
  name: 'notwithstanding querulous',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'pertain',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
