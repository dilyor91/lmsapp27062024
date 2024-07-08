import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 26798,
  questionText: 'timetable nurture unto',
};

export const sampleWithPartialData: IQuestion = {
  id: 29134,
  questionText: 'exalted waterlogged oh',
  point: 17915,
};

export const sampleWithFullData: IQuestion = {
  id: 396,
  questionText: 'abaft',
  point: 7920,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'from imperturbable dim',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
