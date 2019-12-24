import { MenuItem } from './menu-item';

function isStyleActive(state, nodeType, attrs) {
  if (state.selection.empty) return false;
  let { from, to } = state.selection;
  let activeNode = 0;
  let eligibleNode = 0;

  state.doc.nodesBetween(from, to, (node, _pos) => {
    if (node.isTextblock && node.type == nodeType) {
      eligibleNode++;
      if (node.attrs.style == attrs.style) activeNode++;
    }
  });

  return activeNode == eligibleNode;
}

export function styleItem(commands) {
  return (nodeType, options) => {
    let command = commands['setStyle'](options.attrs);
    let passedOptions = {
      active(state) { return isStyleActive(state, nodeType, options.attrs) },
      enable(state) { return command(state) },
      run(state, dispatch, view) {
        return command(state, dispatch, view);
      }
    };

    for (let prop in options) passedOptions[prop] = options[prop];
    return new MenuItem(passedOptions);
  }
}
