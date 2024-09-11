import { IQuestionGroup, NewQuestionGroup } from './question-group.model';

export const sampleWithRequiredData: IQuestionGroup = {
  id: 15471,
  name: 'righteously curly given',
};

export const sampleWithPartialData: IQuestionGroup = {
  id: 17972,
  name: 'thankfully fooey grill',
};

export const sampleWithFullData: IQuestionGroup = {
  id: 31837,
  name: 'smooth waken throng',
};

export const sampleWithNewData: NewQuestionGroup = {
  name: 'briefly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
