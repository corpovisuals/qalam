import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency-decorators';
import validations from 'qalam/validations/embed-photo';
import imageRequirements from 'qalam/utils/image-requirements';

export default class EmbedPhotoForm extends Component {
  @service store
  @service changesetSaver
  @service errorNotifier
  @service notifications

  validations = validations
  changeset = null

  get embedPhoto() {
    return this.store.createRecord('embedPhoto');
  }

  get imageRequirements() {
    return {
      ...imageRequirements({ model: 'embedPhoto' }),
      aspectRatio: null
    };
  }

  @action
  submit(changeset) {
    this.changeset = changeset;
    this.submission.perform();
  }

  @task
  *submission() {
    try {
      yield this.changesetSaver.save(this.changeset);
      this._onSuccess(this.changeset);
    } catch(adapterError) {
      this._onError(this.changeset, adapterError);
    }
  }

  _onSuccess(_model) {
    let message = "Photo added successfully";
    this.notifications.success(message, { autoClear: true, clearDuration: 1500 });
  }

  _onError(changeset, adapterError) {
    this.changesetSaver.setError(this.customPackage, changeset)
    this.errorNotifier.notify(adapterError.errors);
  }
}
