import Component from '@glimmer/component';
import { get, computed } from '@ember/object';
import defaultTo from 'lodash.defaultto';
import ENV from '../../config/environment';
import { imageSrc } from 'qalam/helpers/image-src';
import { generateSizes } from 'qalam/utils/image-utils';

export default class ImageElement extends Component {
  lazy = defaultTo(this.args.lazy, true)
  attr = defaultTo(this.args.attr, 'image')

  @computed
  get imageValue() {
    return this.args.image || get(this.args.model, this.attr);
  }

  get src() {
    return imageSrc(
      null, {
        model: this.args.model,
        attr: this.attr,
        image: this.imageValue
      }
    );
  }

  get sizes() {
    return generateSizes(this.args.vwset);
  }

  get srcset() {
    let image = this.imageValue;
    let checkImg = image?.original;

    if (checkImg) {
      let srcs = '';
      let staticHost = ENV.STATIC_HOST_NAME || ENV.STORAGE_ENDPOINT;

      Object.keys(image).filter(w => w !== 'original').forEach((width, index) => {
        let img = image[width];

        if (index > 0) {
          srcs += ', ';
        }

        srcs += `${staticHost}/uploads/${img.storage}/${img.id} ${width}w`;
      });

      return srcs;
    } else {
      return null;
    }
  }
}
