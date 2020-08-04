import isPlainObject from 'lodash.isplainobject';
import { camelize } from '@ember/string';

function camelizeKeys(hash = {}) {
  Object.keys(hash).forEach(function(key) {
    let newKey = camelize(key);
    if (newKey !== key) {
      hash[newKey] = hash[key];
      delete hash[key];
    }

    if (isPlainObject(hash[newKey])) {
      hash[newKey] = camelizeKeys(hash[newKey]);
    }
  });

  return hash;
}

export default function(hash) {
  return camelizeKeys(hash);
}