import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 6043,
  optionText: 'act ouch beneath',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 29347,
  optionText: 'when eyestrain verbally',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 8967,
  optionText: 'er bossy dart',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'concerning hm',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
