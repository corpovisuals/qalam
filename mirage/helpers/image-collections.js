import sample from 'lodash.sample';

export function collections() {
  return {
    history: 4620349,
    islamicArchitecture1: 8474046,
    islamicArchitecture2: 4296497,
    iran: 3471350,
    turkey: 4819737
  }
}

export function randomCollection() {
  return sample(collections());
}
