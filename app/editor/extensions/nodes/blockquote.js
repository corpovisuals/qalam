import Node from '../types/node';

export default class Blockquote extends Node {
  get name() {
    return 'blockquote';
  }

  get schema() {
    return {
      content: "block+",
      group: "block",
      defining: true,
      parseDOM: [{tag: "blockquote"}],
      toDOM() { return ["blockquote", 0] }
    }
  }
}
