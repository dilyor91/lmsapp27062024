import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 29602,
};

export const sampleWithPartialData: IRoom = {
  id: 26247,
  name: 'opposite',
  description: 'fighter',
  status: false,
};

export const sampleWithFullData: IRoom = {
  id: 3257,
  name: 'backbone patch meanwhile',
  description: 'electroplate considering',
  capacity: 1039,
  status: false,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
