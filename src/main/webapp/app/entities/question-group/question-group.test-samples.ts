import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 15478,
  name: 'farm even',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 22928,
  name: 'premise but safeguard',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 18343,
  name: 'merge',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'famously aw',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
