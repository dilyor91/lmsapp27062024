import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 19798,
  name: 'questioningly',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 7024,
  name: 'for',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 18142,
  name: 'hunger',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'because',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
