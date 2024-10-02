import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 12622,
  name: 'finally vengeful boldly',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 23316,
  name: 'pfft bakeware now',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 7042,
  name: 'given quickly surge',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'defiantly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
