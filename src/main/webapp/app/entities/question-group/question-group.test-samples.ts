import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 5876,
  name: 'cleverly until',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 30531,
  name: 'lopsided',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 24691,
  name: 'yesterday hm',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'rustle',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
