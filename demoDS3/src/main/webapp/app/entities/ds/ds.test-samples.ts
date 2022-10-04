import { IDS, NewDS } from './ds.model';

export const sampleWithRequiredData: IDS = {
  id: 86045,
};

export const sampleWithPartialData: IDS = {
  id: 67597,
};

export const sampleWithFullData: IDS = {
  id: 86657,
};

export const sampleWithNewData: NewDS = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
