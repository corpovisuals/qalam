import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FileInput extends Component {
  @tracked isShowingErrorDialog = false
  @tracked errorMessage = null

  @action
  onFileError(errorMessage) {
    this.errorMessage = errorMessage;
    this.isShowingErrorDialog = true;
  }

  @action
  closeDialog() {
    this.isShowingErrorDialog = false;
  }

  @action
  beforeUploadHook(file) {
    if (this.args.beforeUpload) {
      return this.args.beforeUpload(file);
    } else {
      return file;
    }
  }

  @action
  onProgress(value) {
    if (this.args.onUploadProgress) {
      return this.args.onUploadProgress(value);
    }
  }
}
