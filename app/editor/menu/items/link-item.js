import { MenuItem } from 'prosemirror-menu';

function markActive(state, type) {
  let {from, $from, to, empty} = state.selection
  if (empty) return type.isInSet(state.storedMarks || $from.marks())
  else return state.doc.rangeHasMark(from, to, type)
}

export function linkItem(commands) {
  return (markType, options) => {
    let passedOptions = {
      active(state) { return markActive(state, markType) },
      enable(state) { return !state.selection.empty },
      run(state, dispatch, view) {
        return commands[markType.name]()(state, dispatch, view)
      }
    };

    for (let prop in options) passedOptions[prop] = options[prop];
    return new MenuItem(passedOptions);
  }
}
