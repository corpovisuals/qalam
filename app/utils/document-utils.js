import { get } from '@ember/object';
import ENV from '../config/environment';

export function generateFileSrc({ model, attr, document }) {
  let documentValue = document || get(model, attr);

  if (documentValue) {
    let staticHost = ENV.STATIC_HOST_NAME || ENV.STORAGE_ENDPOINT;
    let storage = documentValue.storage;
    let id = documentValue.id;
    return `${staticHost}/uploads/${storage}/${id}`;
  } else {
    return '#';
  }
}
