import Component from '@glimmer/component';
import { get, computed } from '@ember/object';
import defaultTo from 'lodash.defaultto';
import { imageSrc } from 'qalam/helpers/image-src';
import { generateSizes, generateSrcset } from 'qalam/utils/image-utils';

export default class ImageElement extends Component {
  lazy = defaultTo(this.args.lazy, true)
  attr = defaultTo(this.args.attr, 'image')

  @computed('args.{image,model}', 'attr')
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
    return generateSrcset(this.imageValue);
  }
}
