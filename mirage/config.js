import ENV from '../config/environment';
import Response from 'ember-cli-mirage/response'; // eslint-disable-line no-unused-vars
import handleIndex from './helpers/handle-index'; // eslint-disable-line no-unused-vars

export default function() {
  this.urlPrefix = ENV.HOST_NAME;
  this.namespace = '/api';
  // this.timing = 400;
  this.passthrough();
  this.passthrough(ENV.STORAGE_ENDPOINT);

  this.post('/uploads/images', (/* schema, request */) => {
    return new Response(201, {}, {});
  });

  this.resource('embed_photos');
  this.get('embed_photos', handleIndex('embedPhotos'));
}
