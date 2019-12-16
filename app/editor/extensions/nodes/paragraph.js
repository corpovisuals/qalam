import Node from '../types/node';

export default class Paragraph extends Node {
  get name() {
    return 'paragraph';
  }

  get schema() {
    return {
      content: "inline*",
      group: "block",
      parseDOM: [{tag: "p"}],
      toDOM() { return ["p", 0] }
    }
  }
}
