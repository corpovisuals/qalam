import Component from '@glimmer/component';
import { Editor } from 'qalam/editor';

export default class SampleEditor extends Component {
  setupEditor(element, [instance]) {
    instance.editorView = new Editor({
      place: element,
      content: element.nextElementSibling,
      onUpdate: function (_html, doc) {
        element.parentElement.nextElementSibling.textContent = JSON.stringify(
          doc, null, 4
        );
      }
    });
  }

  destroyEditor(_element, [instance]) {
    if (instance.editorView) {
      instance.editorView.destroy();
    }
  }
}
