import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 28793,
  optionText: 'enthusiastically eek',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 27039,
  optionText: 'barring eek',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 25152,
  optionText: 'unless till',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'exactly',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
