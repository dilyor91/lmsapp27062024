import { ICommunity, NewCommunity } from './community.model';

export const sampleWithRequiredData: ICommunity = {
  id: 18565,
};

export const sampleWithPartialData: ICommunity = {
  id: 20610,
  body: 'celebrated other pish',
  setAsAnonymous: false,
  status: true,
};

export const sampleWithFullData: ICommunity = {
  id: 29925,
  title: 'shrilly',
  body: 'crumble after',
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
