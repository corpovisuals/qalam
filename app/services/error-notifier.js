import Service from '@ember/service';
import { inject as service } from '@ember/service';
import inRange from 'lodash.inrange';

export default class ErrorNotifier extends Service {
  @service notifications

  notify(errors) {
    let [{ status, title }] = errors;
    let statusNumber = parseInt(status);

    if (inRange(statusNumber, 500, 600)) {
      this.notifications.error('The API responded with an error. Please try again.', {
        autoClear: true
      });
    } else if (inRange(statusNumber, 400, 500) && statusNumber !== 422) {
      this.notifications.error(title, {
        autoClear: true
      });
    }
  }
}
