import Node from '../types/node';
import { wrappingInputRule } from 'prosemirror-inputrules';
import { wrapIn } from '../../commands';

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

  keys({ type }) {
    return {
      'Ctrl->': wrapIn(type)
    }
  }

  inputRules({ type }) {
    return [
      // Given a blockquote node type, returns an input rule that turns `"> "`
      // at the start of a textblock into a blockquote.
      wrappingInputRule(/^\s*>\s$/, type)
    ]
  }
}
