import { randomCollection } from './image-collections';
import random from 'lodash.random';

export default function(opts) {
  let metadata = {
    width: opts.width || random(1000, 1800),
    height: opts.height || random(900, 1500),
    collection: opts.collection || randomCollection()
  }

  let size = opts.size.toString();
  let attrs = {};
  attrs[size] = { metadata };

  if (size !== '1200') {
    attrs['1200'] = { metadata };
  }

  return attrs;
}
