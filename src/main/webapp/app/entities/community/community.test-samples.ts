import { ICommunity, NewCommunity } from './community.model';

export const sampleWithRequiredData: ICommunity = {
  id: 3871,
};

export const sampleWithPartialData: ICommunity = {
  id: 217,
  title: 'gosh redesign out',
  body: 'grimy wildly profane',
  setAsAnonymous: false,
  onlyMe: true,
  toAllStudents: true,
};

export const sampleWithFullData: ICommunity = {
  id: 31827,
  title: 'unethically pulse stay',
  body: 'knowledgeable',
  setAsAnonymous: false,
  onlyMe: true,
  toAllStudents: true,
  status: true,
};

export const sampleWithNewData: NewCommunity = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
