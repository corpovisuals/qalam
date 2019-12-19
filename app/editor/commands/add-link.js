import { toggleMark } from 'prosemirror-commands';
import { TextField, openPrompt } from './prompt';

function markActive(state, type) {
  let {from, $from, to, empty} = state.selection
  if (empty) return type.isInSet(state.storedMarks || $from.marks())
  else return state.doc.rangeHasMark(from, to, type)
}

export default function (type) {
  return (state, dispatch, view) => {
    if (markActive(state, type)) {
      toggleMark(type)(state, dispatch)
      return true
    }
    openPrompt({
      title: "Create a link",
      fields: {
        href: new TextField({
          label: "Link target",
          required: true
        }),
        title: new TextField({label: "Title"})
      },
      callback(attrs) {
        toggleMark(type, attrs)(view.state, view.dispatch)
        view.focus()
      }
    })
  }
}
