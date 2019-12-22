import Node from '../types/node';
import { wrappingInputRule } from "prosemirror-inputrules"

export default class BulletList extends Node {
  get name() {
    return 'bullet_list';
  }

  inputRules({ type }) {
    return [
      // Given a list node type, returns an input rule that turns a bullet
      // (dash, plush, or asterisk) at the start of a textblock into a
      // bullet list.
      wrappingInputRule(/^\s*([-+*])\s$/, type)
    ]
  }
}
