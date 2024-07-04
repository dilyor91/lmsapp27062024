import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 17879,
  name: 'gee',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 15760,
  name: 'um nearly foolhardy',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 6889,
  name: 'gee meaningfully',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'er',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
