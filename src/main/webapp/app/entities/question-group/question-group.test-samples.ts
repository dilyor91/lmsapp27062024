import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 29390,
  name: 'uncommon',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 14046,
  name: 'afore yet',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 25108,
  name: 'celebrated commonly whisk',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'mad destabilise than',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
