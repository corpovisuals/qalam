import Component from '@glimmer/component';
import { action } from '@ember/object';
import { reads } from 'macro-decorators';

export default class ImageCropper extends Component {
  @reads('args.imageRequirements.aspectRatio') aspectRatio

  get previewSrc() {
    return this.args.newImage?.src;
  }

  @action
  ready(cropper) {
    let { minWidth, minHeight } = this.args.imageRequirements;
    let { canvasData, cropBoxData } = cropper;
    let canvastoNaturalRatio = canvasData.height / canvasData.naturalHeight;

    cropBoxData.minWidth = Math.ceil(minWidth * canvastoNaturalRatio);
    cropBoxData.minHeight = Math.ceil(minHeight * canvastoNaturalRatio);

    cropper.setCropBoxData(cropBoxData);
  }

  @action
  crop(cropper) {
    let { canvasData, cropBoxData } = cropper;
    let naturalToCanvasRatio = canvasData.naturalHeight / canvasData.height;
    let height = cropBoxData.height * naturalToCanvasRatio;
    let width = cropBoxData.width * naturalToCanvasRatio;
    let top = (cropBoxData.top - cropBoxData.minTop) * naturalToCanvasRatio
    let left = (cropBoxData.left - cropBoxData.minLeft) * naturalToCanvasRatio

    let cropData = {
      height: Math.ceil(height),
      width: Math.ceil(width),
      top: Math.max(0, Math.floor(top)),
      left: Math.max(0, Math.floor(left))
    };

    this.args.update(cropData);
  }
}
