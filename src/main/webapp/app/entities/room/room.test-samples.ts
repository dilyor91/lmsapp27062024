import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 11601,
};

export const sampleWithPartialData: IRoom = {
  id: 6388,
  name: 'supposing',
  capacity: 18364,
};

export const sampleWithFullData: IRoom = {
  id: 2163,
  name: 'upwardly',
  description: 'zowie',
  capacity: 28474,
  status: true,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
