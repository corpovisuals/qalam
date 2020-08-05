export default class Validator {
  constructor(file, requirements) {
    this.file = file;
    this.requirements = requirements;
  }

  checkError() {
    let errors = [];

    let contentTypeError = this._checkContentType();
    if (contentTypeError) { errors.push(contentTypeError) }

    let sizeError = this._checkSize();
    if (sizeError) { errors.push(sizeError) }

    return errors;
  }

  _checkContentType() {
    let { allowedContentTypes } = this.requirements;

    if (!allowedContentTypes.includes(this.file.type)) {
      let allowedTypes = allowedContentTypes.map((type) => type.split('/').pop());
      let errorMessage = 'This file type is not allowed.'
        + ` Only ${allowedTypes.join(', ')} files are allowed.`;

      return errorMessage;
    }
  }

  _checkSize() {
    let { maxSize } = this.requirements;

    if (this.file.size > maxSize) {
      let maxSizeAsMB = maxSize / (1024 * 1024);
      let errorMessage = 'Too large!'
        + ` The uploaded file has exceeded the size limit of ${maxSizeAsMB}MB.`;

      return errorMessage;
    }
  }
}
