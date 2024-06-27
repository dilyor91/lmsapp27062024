import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'b13023fa-562c-4f30-b931-42a5bfd63ef9',
};

export const sampleWithPartialData: IAuthority = {
  name: '9cb9b564-3528-4a8b-8737-5c4a6718bc2d',
};

export const sampleWithFullData: IAuthority = {
  name: '5e917a8d-2063-47f3-b741-e9d08ea8e6cb',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
