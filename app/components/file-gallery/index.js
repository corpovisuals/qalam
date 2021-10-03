import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FileGallery extends Component {
  page = 1
  perPage = 4

  @action
  closeScreen() {
    this.args.close();
  }
}
