import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 31640,
  name: 'zowie a faithfully',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 31302,
  name: 'monkey dragster',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 5588,
  name: 'yet',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'ouch following pioneer',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
