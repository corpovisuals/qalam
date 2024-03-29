import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Editor } from 'qalam/editor';
import {
  generateSrc,
  generateSrcset,
  generateSizes,
  getImageMetadata
} from 'qalam/utils/image-utils';
import { generateFileSrc } from 'qalam/utils/document-utils';

export default class SampleEditor extends Component {
  @tracked editorStates = {}
  @tracked showImageGallery = false
  @tracked showFileGallery = false

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
      onImagePrompt: instance.onImagePrompt,
      onFilePrompt: instance.onFilePrompt
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

  onFilePrompt(states) {
    this.editorStates = states;
    this.showFileGallery = true;
  }

  @action
  insertImage({ nodeType, view }, photo) {
    this.showImageGallery = false;

    let metadata = getImageMetadata(photo, 'image');

    let attrs = {
      src: generateSrc({ model: photo, attr: 'image' }),
      srcset: generateSrcset(photo.image),
      sizes: generateSizes({
        hg: '44vw',
        bg: '44vw',
        xl: '47vw',
        hd: '50vw',
        lg: '59vw'
      }),
      alt: photo.caption,
      title: photo.caption,
      style: `width: 100%; aspect-ratio: ${metadata.width} / ${metadata.height};`,
      loading: 'lazy'
    };

    view.dispatch(
      view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs))
    );
    view.focus();
  }

  @action
  insertFile({ nodeType, view }, file) {
    this.showFileGallery = false;

    let attrs = {
      href: generateFileSrc({ model: file, attr: 'document' }),
      title: file.name
    };

    view.dispatch(
      view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs))
    );
    view.focus();
  }

  @action
  closeImageGallery() {
    this.showImageGallery = false;
  }

  @action
  closeFileGallery() {
    this.showFileGallery = false;
  }
}
