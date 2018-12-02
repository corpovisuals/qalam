import { MenuItem } from 'prosemirror-menu';

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

function setStyle(nodeType, attrs) {
  return function(state, dispatch) {
    if (state.selection.empty) return false;
    let { from, to } = state.selection;
    let tr = state.tr;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.isTextblock && node.type == nodeType) {
        tr = tr.setNodeMarkup(pos, nodeType, attrs);
      }
    });

    if (!tr.steps.length) return false;
    if (dispatch) dispatch(tr);
    return true;
  }
}

export function styleItem(nodeType, options) {
  let command = setStyle(nodeType, options.attrs);
  let passedOptions = {
    run: command,
    active(state) { return isStyleActive(state, nodeType, options.attrs) },
    enable(state) { return command(state) },
  };

  for (let prop in options) passedOptions[prop] = options[prop];
  return new MenuItem(passedOptions);
}
