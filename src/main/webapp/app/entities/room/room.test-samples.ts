import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 20281,
};

export const sampleWithPartialData: IRoom = {
  id: 28648,
  name: 'by now',
};

export const sampleWithFullData: IRoom = {
  id: 29371,
  name: 'usefully loftily furthermore',
  description: 'drive',
  capacity: 5265,
  status: false,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
