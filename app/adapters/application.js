import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import ENV from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.HOST_NAME
  namespace = 'api'

  // allows the multiword paths in urls to be underscored
  pathForType(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  }
}
