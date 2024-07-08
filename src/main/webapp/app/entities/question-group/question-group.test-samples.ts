import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 8454,
  name: 'usefully partridge athwart',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 30478,
  name: 'lanky considering fascinate',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 25852,
  name: 'beyond actually',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'immunise powder',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
