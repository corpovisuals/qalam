import Component from '@glimmer/component';
import { get, computed } from '@ember/object';
import defaultTo from 'lodash.defaultto';
import {
  generateSrc,
  generateSrcset,
  generateSizes
} from 'qalam/utils/image-utils';

export default class ImageElement extends Component {
  lazy = defaultTo(this.args.lazy, true)
  attr = defaultTo(this.args.attr, 'image')

  @computed('args.{image,model}', 'attr')
  get src() {
    return generateSrc({
      model: this.args.model,
      attr: this.attr,
      image: this.args.image
    });
  }

  get srcset() {
    let image = this.args.image || get(this.args.model, this.attr);
    return generateSrcset(image);
  }

  get sizes() {
    return generateSizes(this.args.vwset);
  }
}
