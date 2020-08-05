import { helper } from '@ember/component/helper';
import { get } from '@ember/object';
import ENV from '../config/environment';
import {
  canonicalImage,
  randomImage,
  placeholderImage,
  canShowRandom
} from 'qalam/utils/image-utils';

export function imageSrc(params, { model, attr, image }) {
  let imageValue = image || get(model, attr);
  let checkImg = imageValue?.original;

  if (checkImg) {
    let canonicalImg = canonicalImage(model, attr, imageValue);

    if (canonicalImg) {
      let staticHost = ENV.STATIC_HOST_NAME || ENV.STORAGE_ENDPOINT;
      return `${staticHost}/uploads/${canonicalImg.storage}/${canonicalImg.id}`;
    }
  } else if (canShowRandom({ image: imageValue })) {
    return randomImage({ image: imageValue });
  } else if (model && attr) {
    return placeholderImage({ model, attr });
  } else {
    return '';
  }
}

export default helper(imageSrc);
