import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 16922,
  name: 'yippee tango heavy',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 31739,
  name: 'euphoric object parka',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 11489,
  name: 'unless pfft',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'weighty taut impugn',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
