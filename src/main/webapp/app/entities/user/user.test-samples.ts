import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 12739,
  login: '-V',
};

export const sampleWithPartialData: IUser = {
  id: 27988,
  login: '5NO@tq\\6R1IPG',
};

export const sampleWithFullData: IUser = {
  id: 24913,
  login: 'cJ@sX3BI\\"bUlyy\\|9awWLu\\^snb\\sMN\\PKbAK',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
