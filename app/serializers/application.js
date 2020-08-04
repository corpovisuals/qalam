import JSONAPISerializer from '@ember-data/serializer/json-api';
import camelizeKeys from 'qalam/utils/camelize-keys';

export default class ApplicationSerializer extends JSONAPISerializer {
  normalizeQueryResponse() {
    let result = super.normalizeQueryResponse(...arguments);
    result.meta = camelizeKeys(result.meta);
    return result;
  }
}
