import { ICommunity, NewCommunity } from './community.model';

export const sampleWithRequiredData: ICommunity = {
  id: 27680,
};

export const sampleWithPartialData: ICommunity = {
  id: 10171,
  setAsAnonymous: true,
  toAllStudents: false,
};

export const sampleWithFullData: ICommunity = {
  id: 17780,
  title: 'despite',
  body: 'concerning meh',
  setAsAnonymous: true,
  onlyMe: true,
  toAllStudents: false,
  status: false,
};

export const sampleWithNewData: NewCommunity = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
