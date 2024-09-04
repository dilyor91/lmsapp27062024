import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 639,
  name: 'branch but what',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 13607,
  name: 'without patrol brr',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 28307,
  name: 'afore fooey stained',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'furthermore espouse',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
