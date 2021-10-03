import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DocumentInput extends Component {
  @tracked progressValue = 0;

  uploadEndpoint = '/api/uploads/documents';

  @action
  update(value) {
    this.args.onUpdate(value);
  }
}
