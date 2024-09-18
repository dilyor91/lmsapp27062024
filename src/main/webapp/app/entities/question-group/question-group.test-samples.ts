import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 25526,
  name: 'magnetize',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 29354,
  name: 'warmly',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 17963,
  name: 'harbor handmade',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'certificate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
