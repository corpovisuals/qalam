import Node from '../types/node';
import { setBlockType } from '../../commands';
import { textblockTypeInputRule } from 'prosemirror-inputrules';

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

  keys({ type }) {
    return {
      'Shift-Ctrl-\\': setBlockType(type)
    }
  }

  inputRules({ type }) {
    return [
      // Given a code block node type, returns an input rule that turns a
      // textblock starting with three backticks into a code block.
      textblockTypeInputRule(/^```$/, type)
    ]
  }
}
