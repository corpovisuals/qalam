import { MenuItem } from 'prosemirror-menu';
import { NodeSelection } from 'prosemirror-state';
import { TextField, openPrompt } from './prompt';

function canInsert(state, nodeType) {
  let $from = state.selection.$from
  for (let d = $from.depth; d >= 0; d--) {
    let index = $from.index(d)
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true
  }
  return false
}


export function insertImageItem(nodeType, options) {
  let passedOptions = {
    enable(state) { return canInsert(state, nodeType) },
    run(state, _, view) {
      let {from, to} = state.selection, attrs = null
      if (state.selection instanceof NodeSelection && state.selection.node.type == nodeType)
        attrs = state.selection.node.attrs
      openPrompt({
        title: "Insert image",
        fields: {
          src: new TextField({label: "Location", required: true, value: attrs && attrs.src}),
          title: new TextField({label: "Title", value: attrs && attrs.title}),
          alt: new TextField({label: "Description",
                              value: attrs ? attrs.alt : state.doc.textBetween(from, to, " ")})
        },
        callback(attrs) {
          view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(attrs)))
          view.focus()
        }
      })
    }
  };

  for (let prop in options) passedOptions[prop] = options[prop];
  return new MenuItem(passedOptions);
}
