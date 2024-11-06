import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 32025,
};

export const sampleWithPartialData: IRoom = {
  id: 12222,
  description: 'pish rationalize',
  capacity: 29209,
  status: true,
};

export const sampleWithFullData: IRoom = {
  id: 24922,
  name: 'whenever',
  description: 'yuck',
  capacity: 7310,
  status: false,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
