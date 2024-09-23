import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 15145,
};

export const sampleWithPartialData: IGroup = {
  id: 11864,
  name: 'whose',
};

export const sampleWithFullData: IGroup = {
  id: 28675,
  name: 'psst gosh integer',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
