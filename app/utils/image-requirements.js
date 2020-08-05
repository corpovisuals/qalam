import settings from './image-settings';

export default function imageRequirements({ model, attr = 'image' }) {
  let { width: minWidth, height: minHeight } = settings[model][attr];

  return {
    ...settings.image,
    minWidth: minWidth,
    minHeight: minHeight,
    aspectRatio: minWidth / minHeight
  };
}