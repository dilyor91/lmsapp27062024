import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 9925,
  optionText: 'border within',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 11763,
  optionText: 'though furthermore',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 17335,
  optionText: 'amazing old',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'a daring',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
