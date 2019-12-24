export default function(nodeType, attrs) {
  return (state, dispatch) => {
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
