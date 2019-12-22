import { createTable } from 'prosemirror-utils';

export default function (schema) {
  return (state, dispatch) => {
    if (dispatch) {
      const nodes = createTable(schema);
      const tr = state.tr.replaceSelectionWith(nodes).scrollIntoView();
      dispatch(tr);
    }
    return true;
  }
}
