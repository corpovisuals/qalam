import {
  validateLength
} from 'ember-changeset-validations/validators';
import validateFile from '../validators/file';

export default {
  caption: [
    validateLength({ allowBlank: true, max: 250 })
  ],

  credit: [
    validateLength({ allowBlank: true, max: 100 })
  ],

  image: validateFile()
};
