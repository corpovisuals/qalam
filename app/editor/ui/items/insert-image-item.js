import { MenuItem } from '../elements';

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
      options.onImagePrompt({ nodeType, state, view });
    }
  };

  for (let prop in options) passedOptions[prop] = options[prop];
  return new MenuItem(passedOptions);
}
