import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Editor } from 'qalam/editor';
// import { NodeSelection } from 'prosemirror-state';
// import { TextField, openPrompt } from './prompt';

export default class SampleEditor extends Component {
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

  onImagePrompt({ nodeType, state, view }) {
    this.showImageGallery = true;

    // let {from, to} = state.selection, attrs = null
    // if (state.selection instanceof NodeSelection && state.selection.node.type == nodeType)
    //   attrs = state.selection.node.attrs

    // return openPrompt({
    //   title: "Insert image",
    //   fields: {
    //     src: new TextField({label: "Location", required: true, value: attrs && attrs.src}),
    //     title: new TextField({label: "Title", value: attrs && attrs.title}),
    //     alt: new TextField({label: "Description",
    //                         value: attrs ? attrs.alt : state.doc.textBetween(from, to, " ")})
    //   },
    //   callback(attrs) {
    //     view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)))
    //     view.focus()
    //   }
    // });
  }

  @action
  closeImageGallery() {
    this.showImageGallery = false;
  }
}
