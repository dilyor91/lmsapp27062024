import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 3597,
  optionText: 'gosh frankly',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 1833,
  optionText: 'voluntarily derogate revel',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 2312,
  optionText: 'dynamite marksman',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'pace amid between',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
