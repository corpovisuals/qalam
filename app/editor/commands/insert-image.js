import { NodeSelection } from 'prosemirror-state';
import { TextField, openPrompt } from './prompt';

export default function (nodeType) {
  return (state, _, view) => {
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
}
