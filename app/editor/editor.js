import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { exampleSetup } from 'prosemirror-example-setup';
import { fixTables } from 'prosemirror-tables';
import { schema } from './schema';
import { buildMenuItems } from './menu';
import tablePlugins from './plugins/table';

export class Editor {
  constructor(options) {
    let doc = DOMParser.fromSchema(schema).parse(options.content)
    let state = EditorState.create({
      doc,
      plugins: exampleSetup({
        schema,
        menuContent: buildMenuItems(schema).fullMenu
      }).concat(tablePlugins)
    });

    let fix = fixTables(state);
    if (fix) state = state.apply(fix.setMeta('addToHistory', false));

    let view = new EditorView(options.place, {
      state,

      dispatchTransaction(transaction) {
        let newState = view.state.apply(transaction);
        view.updateState(newState);
        if (transaction.docChanged) {
          options.onUpdate(view.dom.innerHTML, transaction.doc);
        }
      }
    });

    return view;
  }
}
