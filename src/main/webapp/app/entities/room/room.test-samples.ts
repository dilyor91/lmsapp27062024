import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 32670,
};

export const sampleWithPartialData: IRoom = {
  id: 20265,
  name: 'finished towards excitedly',
  description: 'lounge',
  capacity: 30645,
  status: false,
};

export const sampleWithFullData: IRoom = {
  id: 14003,
  name: 'sleepily anticodon physically',
  description: 'importance inwardly keel',
  capacity: 12130,
  status: true,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
