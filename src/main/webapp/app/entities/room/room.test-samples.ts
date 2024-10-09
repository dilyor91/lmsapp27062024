import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 8954,
};

export const sampleWithPartialData: IRoom = {
  id: 5690,
  description: 'er',
};

export const sampleWithFullData: IRoom = {
  id: 28450,
  name: 'sonnet procurement',
  description: 'duh',
  capacity: 28807,
  status: true,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
