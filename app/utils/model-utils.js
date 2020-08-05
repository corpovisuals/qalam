import { get } from '@ember/object';
import { camelize } from '@ember/string';

export function getModelName(model) {
  return model.constructor.modelName;
}

export function getModel(model, modelName) {
  if (model.hasOwnProperty(modelName)) {
    return model[modelName];
  } else {
    return model;
  }
}

export function getInternalModelName(model) {
  return camelize(get(model, '_internalModel.modelName'));
}