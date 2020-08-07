import { get } from '@ember/object';
import ENV from '../config/environment';
import settings from 'qalam/utils/image-settings';
import { getInternalModelName } from './model-utils';

export function getImageSettings(model, attr, modelName) {
  let name = modelName || getInternalModelName(model);
  return settings[name][attr];
}

export function getImageMetadata(model, attr) {
  let imageSettings = getImageSettings(model, attr);
  return get(model, `${attr}.${imageSettings.width}.metadata`) || imageSettings;
}

export function canonicalImage(model, attr, image) {
  let canonicalImg = image['1200'];

  if (!canonicalImg) {
    let width = Object.keys(image).filter(w => w !== 'original').pop();

    if (width) {
      canonicalImg = image[width];
    }
  }

  return canonicalImg;
}

export function socialMediaImage({ model, attr }) {
  let image = get(model, attr);
  let checkImg = image?.original;

  if (checkImg) {
    let canonicalImg = canonicalImage(model, attr, image);

    if (canonicalImg) {
      const staticHost = ENV.STATIC_HOST_NAME || ENV.STORAGE_ENDPOINT;

      return {
        url: `${staticHost}/uploads/${canonicalImg.storage}/${canonicalImg.id}`,
        width: canonicalImg.metadata.width,
        height: canonicalImg.metadata.height
      };
    }
  } else {
    const assetHost = ENV.ASSET_HOST_NAME || ENV.HOST_NAME;
    return {
      url: `${assetHost}/assets/images/unhashed/logo-banner.png`,
      width: 1200,
      height: 650
    };
  }
}

export function placeholderImage({ model, attr }) {
  let attrName = attr || 'image';
  let { width, height } = getImageMetadata(model, attrName);

  /* # character in the data url is encoded to %23 */
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="%23cdd4ca"/></svg>`;
}

export function randomImage({ image }) {
  let meta = image['1200'].metadata;
  return `https://source.unsplash.com/collection/${meta.collection}/${meta.width}x${meta.height}`;

}

export function canShowRandom({ image }) {
  return (
    ENV.RANDOM_IMAGE === 'true' &&
    ENV.environment !== 'test' &&
    image &&
    image.hasOwnProperty('1200') &&
    image['1200'].metadata
  );
}

export function generateSizes(vwset = {}) {
  let breakpoints = {
    xs: { max: '575px' },
    sm: { min: '576px',  max: '767px' },
    md: { min: '768px',  max: '991px' },
    lg: { min: '992px',  max: '1399px' },
    hd: { min: '1400px', max: '1959px' },
    xl: { min: '1960px', max: '2599px' },
    bg: { min: '2600px', max: '3899px' },
    hg: { min: '3900px' }
  };

  let sizeStr = '';

  Object.keys(breakpoints).forEach((size, index) => {
    if (index > 0) {
      sizeStr += ', ';
    }

    if ('min' in breakpoints[size]) {
      sizeStr += `(min-width: ${breakpoints[size].min})`;
    }

    if ('min' in breakpoints[size] && 'max' in breakpoints[size]) {
      sizeStr += ' and ';
    }

    if ('max' in breakpoints[size]) {
      sizeStr += `(max-width: ${breakpoints[size].max})`;
    }

    sizeStr += vwset[size] ? ` ${vwset[size]}` : ' 100vw';
  });

  return sizeStr;
}

export function generateSrcset(image) {
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
