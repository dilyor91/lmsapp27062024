import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 12811,
  optionText: 'mmm chauffeur',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 13319,
  optionText: 'triangular before',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 1469,
  optionText: 'grand toward majestically',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'waver',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
