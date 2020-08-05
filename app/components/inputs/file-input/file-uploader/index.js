import FileField from 'ember-uploader/components/file-field';
import Uploader from 'ember-uploader/uploaders/uploader';
import { inject as service } from '@ember/service';
import Validator from './validator';
import { isEmpty } from '@ember/utils';
import ENV from '../../../../config/environment';

export default class FileUploader extends FileField {
  @service authorizedFetch

  multiple = false

  async filesDidChange(files) {
    for (let file of files) {
      let validator = new Validator(file, this.fileRequirements);
      let errors = validator.checkError();

      if (errors.length) {
        return this.onFileError(errors[0]);
      }

      try {
        await this.beforeUpload(file);
        await this._uploadFile(file);
      } catch(error) {
        return this._setFileError(error);
      }
    }
  }

  async _uploadFile(file) {
    // In dev environment HOST_NAME and STORAGE_ENDPOINT are same, so
    // presigned upload is not needed. For production environment, presigned
    // request is needed for successful upload to some external endpoint e.g.
    // AWS S3.

    if (ENV.HOST_NAME === ENV.STORAGE_ENDPOINT) {
      return this._uploadToRemoteUrl(file);
    } else {
      let qParams = new URLSearchParams(Object.entries(this._fileMeta(file)));
      let data = await this.authorizedFetch.getResource(`presign?${qParams}`);
      return this._uploadToPresignedUrl(file, data);
    }
  }

  _uploadToRemoteUrl(file) {
    let url = `${ENV.STORAGE_ENDPOINT}${this.uploadEndpoint}`;
    let uploader = this._getUploader(url);

    uploader.on('didUpload', (response) => {
      // already formatted by upload endpoint
      this.onUpdate(response);
    });

    if (!isEmpty(file)) {
      return uploader.upload(file);
    }
  }

  _uploadToPresignedUrl(file, response) {
    let uploader = this._getUploader(response.url);

    uploader.on('didUpload', (response) => {
      // parse XML document returned by S3
      let key = response.documentElement
                        .getElementsByTagName('Key')[0]
                        .textContent;
      let attrs = key.split('/');

      let responseData = {
        id: attrs[2],
        storage: attrs[1],
        metadata: this._fileMeta(file)
      };

      this.onUpdate(responseData);
    });

    if (!isEmpty(file)) {
      return uploader.upload(file, response.fields);
    }
  }

  _getUploader(url) {
    let uploader = Uploader.create({ url });

    uploader.on('progress', (e) => {
      this.onUploadProgress(Math.floor(e.percent));
    });

    return uploader;
  }

  _setFileError(error) {
    return this.onFileError(error.message);
  }

  _fileMeta(file) {
    return {
      filename: file.name,
      mimeType: file.type,
      size: file.size
    };
  }
}
