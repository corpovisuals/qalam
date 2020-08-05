import Component from '@glimmer/component';
import { action } from '@ember/object';
import defaultTo from 'lodash.defaultto';
import pick from 'lodash.pick';
import { tracked } from '@glimmer/tracking';

export default class ImageInput extends Component {
  @tracked newImage = null
  @tracked progressValue = 0

  uploadEndpoint = '/api/uploads/images'
  keepTransparency = defaultTo(this.args.keepTransparency, false)

  constructor() {
    super(...arguments);
    let metadata = { keepTransparency: this.keepTransparency };
    this.inputValue = { metadata };
  }

  @action
  update(value) {
    // if updateMeta is called before updateKey, the input value
    // will contain some metadata. Merge this previous metatdata from
    // input value.
    value.metadata = Object.assign({}, value.metadata, this.inputValue.metadata);
    this.inputValue = value;
    this.args.onUpdate(value);
  }

  @action
  updateMeta(meta) {
    // make sure previous input values are kept
    let value = pick(this.inputValue, ['id', 'storage', 'metadata']);
    value.metadata = Object.assign({}, value.metadata, meta);

    this.inputValue = value;
    this.args.onUpdate(value);
  }

  @action
  async beforeUpload(file) {
    let fileData = await this._readToDataURI(file);
    let image = await this._readAsImage(fileData);
    this.newImage = image;
  }

  _readToDataURI(file) {
    return new Promise(function(resolve) {
      let reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  _readAsImage(file) {
    let { minWidth, minHeight } = this.args.imageRequirements;

    return new Promise(function(resolve, reject) {
      let img = new Image();

      img.onload = () => {
        let { width, height } = img;

        if ((width < minWidth) || (height < minHeight)) {
          reject({
            message: 'Too small!'
              + ` The selected image is ${width}px ✕ ${height}px.`
              + ` (width ✕ height) should be at least ${minWidth}px ✕ ${minHeight}px.`
          });
        }

        resolve(img);
      };

      img.src = file;
      img.className = 'preview';
    });
  }
}
