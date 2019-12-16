import Node from '../types/node';

export default class HardBreak extends Node {
  get name() {
    return 'hard_break';
  }

  get schema() {
    return {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{tag: "br"}],
      toDOM() { return ["br"] }
    }
  }
}
