import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 22579,
  optionText: 'onto until thoughtfully',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 12846,
  optionText: 'nor at',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 28650,
  optionText: 'meatloaf frantically graceful',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'even',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
