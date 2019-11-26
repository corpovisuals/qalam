import Component from '@glimmer/component';
import { Editor } from 'qalam/editor';

export default class SampleEditor extends Component {
  setupEditor(element, [instance]) {
    instance.editorView = new Editor({
      place: element,
      content: element.nextElementSibling,
      onUpdate: function () {}
    });
  }

  destroyEditor(_element, [instance]) {
    if (instance.editorView) {
      instance.editorView.destroy();
    }
  }
}
