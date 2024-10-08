import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 11820,
  name: 'bulky rejigger',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 13392,
  name: 'openly subtract given',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 17692,
  name: 'overfeed fibre',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'spherical card',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
