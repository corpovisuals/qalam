import Node from '../types/node';

export default class HorizontalRule extends Node {
  get name() {
    return 'horizontal_rule';
  }

  get schema() {
    return {
      group: "block",
      parseDOM: [{tag: "hr"}],
      toDOM() { return ["hr"] }
    }
  }

  keys({ type }) {
    return {
      'Mod-_': (state, dispatch) => {
        dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
        return true;
      }
    }
  }
}
