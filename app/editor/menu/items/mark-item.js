import { cmdItem } from './cmd-item';

function markActive(state, type) {
  let {from, $from, to, empty} = state.selection
  if (empty) return type.isInSet(state.storedMarks || $from.marks())
  else return state.doc.rangeHasMark(from, to, type)
}

export function markItem(commands) {
  return (markType, options) => {
    let passedOptions = {
      active(state) { return markActive(state, markType) },
      enable: true
    }
    for (let prop in options) passedOptions[prop] = options[prop]
    return cmdItem(commands[markType.name](), passedOptions)
  }
}
