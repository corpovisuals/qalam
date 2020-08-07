import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { get, action } from '@ember/object';
import { Editor } from 'qalam/editor';
import {
  generateSrc,
  generateSrcset,
  generateSizes
} from 'qalam/utils/image-utils';

export default class SampleEditor extends Component {
  @tracked editorStates = {}
  @tracked showImageGallery = false

  setupEditor(element, [instance]) {
    instance.editorView = new Editor({
      instance,
      place: element,
      content: element.nextElementSibling,
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
  insertImage({ nodeType, view }, image) {
    this.showImageGallery = false;

    let attrs = {
      src: generateSrc({ model: image, attr: 'image' }),
      srcset: generateSrcset(get(image, 'image')),
      sizes: generateSizes(),
      alt: image.caption,
      style: 'max-width: 100%'
    }

    view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)));
    view.focus()
  }

  @action
  closeImageGallery() {
    this.showImageGallery = false;
  }
}
