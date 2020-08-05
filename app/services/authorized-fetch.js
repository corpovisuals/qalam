import Service from '@ember/service';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
import ENV from '../config/environment';

export default class AuthorizedFetch extends Service {
  async getResource(url) {
    let session = getOwner(this).lookup('service:session');
    let token = session.data.authenticated.data.attributes.token;

    let response = await fetch(`${ENV.HOST_NAME}/api/${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.json();
  }
}
