import Component from '@glimmer/component';
import { computed } from '@ember/object';
import defaultTo from 'lodash.defaultto';
import { getImageMetadata } from 'qalam/utils/image-utils';

export default class ResponsiveImage extends Component {
  lazy = defaultTo(this.args.lazy, true)
  attr = defaultTo(this.args.attr, 'image')

  get height() {
    return this.metadata.height;
  }

  get width() {
    return this.metadata.width;
  }

  @computed
  get metadata() {
    return getImageMetadata(this.args.model, this.attr);
  }
}
