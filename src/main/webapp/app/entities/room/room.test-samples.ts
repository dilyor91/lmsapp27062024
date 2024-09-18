import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 7588,
};

export const sampleWithPartialData: IRoom = {
  id: 31220,
  name: 'briefly than streetcar',
  description: 'quizzically fennel avaricious',
  status: false,
};

export const sampleWithFullData: IRoom = {
  id: 18124,
  name: 'till shower',
  description: 'drat',
  capacity: 8105,
  status: true,
};

export const sampleWithNewData: NewRoom = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
