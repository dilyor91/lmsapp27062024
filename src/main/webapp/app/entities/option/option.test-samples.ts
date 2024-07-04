import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 15280,
  optionText: 'speculate batting within',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 14614,
  optionText: 'hefty sophomore',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 1569,
  optionText: 'soft knottily',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'hoarse lieu drape',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
