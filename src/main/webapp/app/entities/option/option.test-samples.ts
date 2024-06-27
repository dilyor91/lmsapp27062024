import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 18617,
  optionText: 'whenever uh-huh limping',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 23576,
  optionText: 'while in but',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 23173,
  optionText: 'thoroughly',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'fumble',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
