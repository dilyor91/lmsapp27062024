import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 30613,
  name: 'although',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 27634,
  name: 'keen sully',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 29467,
  name: 'rightfully whoever scarper',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'denominator poorly temp',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
