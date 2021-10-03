import {
  validateLength
} from 'ember-changeset-validations/validators';
import validateFile from '../validators/file';

export default {
  name: validateLength({ allowBlank: true, max: 160 }),

  document: validateFile()
};
