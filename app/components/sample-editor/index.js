import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { get, action } from '@ember/object';
import { Editor } from 'qalam/editor';
import {
  generateSrc,
  generateSrcset,
  generateSizes,
  getImageMetadata
} from 'qalam/utils/image-utils';

export default class SampleEditor extends Component {
  @tracked editorStates = {}
  @tracked showImageGallery = false

  setupEditor(element, [instance]) {
    instance.editorView = new Editor({
      instance,
      place: element,
      content: element.nextElementSibling,
      nodeViews: {
        image(node) { return new ImageView(node) }
      },
      onUpdate: function (_html, doc) {
        element.parentElement.nextElementSibling.textContent = JSON.stringify(
          doc, null, 4
        );
      },
      onImagePrompt: instance.onImagePrompt
    });
  }

  destroyEditor(_element, [instance]) {
    if (instance.editorView) {
      instance.editorView.destroy();
    }
  }

  onImagePrompt(states) {
    this.editorStates = states;
    this.showImageGallery = true;
  }

  @action
  insertImage({ nodeType, view }, photo) {
    this.showImageGallery = false;

    let metadata = getImageMetadata(photo, 'image');

    let attrs = {
      src: generateSrc({ model: photo, attr: 'image' }),
      srcset: generateSrcset(get(photo, 'image')),
      sizes: generateSizes(),
      alt: photo.caption,
      title: photo.caption,
      style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
      metadata: {
        ...metadata,
        caption: photo.caption,
        credit: photo.credit
      }
    }

    view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)));
    view.focus()
  }

  @action
  closeImageGallery() {
    this.showImageGallery = false;
  }
}

class ImageView {
  constructor({ attrs }) {
    let { metadata, ...imgAttrs } = attrs;
    let { width, height, caption } = metadata;

    let imageNode = document.createElement('img');
    Object.keys(imgAttrs).forEach(key => imageNode.setAttribute(key, imgAttrs[key]));

    let wrapperNode = document.createElement('div');
    let paddingHeight = ((height / width) * 100).toFixed(2);
    wrapperNode.style = `width: 100%; position: relative; padding-bottom: ${paddingHeight}%; height: ${paddingHeight}%;`;
    wrapperNode.appendChild(imageNode);

    this.dom = document.createElement('div');
    this.dom.style = 'display: flex; flex-direction: column; align-items: center;';
    this.dom.appendChild(wrapperNode);

    if (caption) {
      let captionNode = document.createElement('div');
      captionNode.style = 'margin-top: 5px;';
      captionNode.innerHTML = caption;
      this.dom.appendChild(captionNode);
    }
  }
}
