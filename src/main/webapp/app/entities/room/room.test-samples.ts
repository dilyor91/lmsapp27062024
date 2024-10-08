import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 21015,
};

export const sampleWithPartialData: IRoom = {
  id: 17774,
  name: 'gosh',
  description: 'urgently not',
  capacity: 14621,
  status: true,
};

export const sampleWithFullData: IRoom = {
  id: 22395,
  name: 'each devise even',
  description: 'super underneath which',
  capacity: 15563,
  status: true,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
