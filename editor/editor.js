import { Schema, DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import { schema } from './schema';
import { buildMenuItems } from './menu';

export class Editor {
  constructor(options) {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks
    });

    let view = new EditorView(options.place, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(options.content),
        plugins: exampleSetup({
          schema: mySchema,
          menuContent: buildMenuItems(mySchema).fullMenu
        })
      }),

      dispatchTransaction(transaction) {
        let newState = view.state.apply(transaction);
        view.updateState(newState);
        if (transaction.docChanged) {
          options.onUpdate(view.dom.innerHTML);
        }
      }
    });

    return view;
  }
}
