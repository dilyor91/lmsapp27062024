import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 88,
  optionText: 'couch consequently pleat',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 11616,
  optionText: 'phooey',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 7279,
  optionText: 'distant barring than',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'chop',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
