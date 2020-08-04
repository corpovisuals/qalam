import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { ExponentialBackoffPolicy } from 'ember-concurrency-retryable';
import defaultTo from 'lodash.defaultto';

export default class LazyModel extends Component {
  @service store

  spinner = defaultTo(this.args.spinner, true)

  load(_element, [instance]) {
    instance.loadResources.perform();
  }

  @task({
    retryable: new ExponentialBackoffPolicy({
      multiplier: 2,
      minDelay: 200,
      maxDelay: 1024000 // ten retries
    })
  })
  *loadResources() {
    return yield this.store.query(this.args.model, this.args.params || {});
  }
}
