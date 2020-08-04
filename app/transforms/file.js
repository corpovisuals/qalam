import Transform from '@ember-data/serializer/transform';
import camelizeKeys from 'qalam/utils/camelize-keys';

export default class FileTransForm extends Transform {
  deserialize(value) {
    return value ? camelizeKeys(value) : value;
  }

  serialize(value) {
    return value;
  }
}
