import Node from '../types/node';

export default class CodeBlock extends Node {
  get name() {
    return 'code_block';
  }

  get schema() {
    return {
      content: "text*",
      marks: "",
      group: "block",
      code: true,
      defining: true,
      parseDOM: [{tag: "pre", preserveWhitespace: "full"}],
      toDOM() { return ["pre", ["code", 0]] }
    }
  }
}
