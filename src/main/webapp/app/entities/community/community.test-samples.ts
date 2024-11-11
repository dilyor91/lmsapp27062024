import { ICommunity, NewCommunity } from './community.model';

export const sampleWithRequiredData: ICommunity = {
  id: 31295,
};

export const sampleWithPartialData: ICommunity = {
  id: 26194,
  body: 'anenst whole',
  setAsAnonymous: false,
  onlyMe: true,
  toAllStudents: true,
};

export const sampleWithFullData: ICommunity = {
  id: 15547,
  title: 'between following',
  body: 'resource as coal',
  setAsAnonymous: false,
  onlyMe: false,
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
