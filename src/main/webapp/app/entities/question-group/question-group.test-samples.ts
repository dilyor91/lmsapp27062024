import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 29117,
  name: 'frantically whose',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 14601,
  name: 'radio remote moisturize',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 1671,
  name: 'off if recede',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'ouch adept unaccountably',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
