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
}
