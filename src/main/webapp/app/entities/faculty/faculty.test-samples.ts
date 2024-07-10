import { IFaculty, NewFaculty } from './faculty.model';

export const sampleWithRequiredData: IFaculty = {
  id: 12060,
};

export const sampleWithPartialData: IFaculty = {
  id: 22003,
  name: 'yowza',
};

export const sampleWithFullData: IFaculty = {
  id: 26465,
  name: 'filing yippee',
};

export const sampleWithNewData: NewFaculty = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
