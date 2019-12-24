import Node from '../types/node';
import { wrapInList } from '../../commands';
import { wrappingInputRule } from 'prosemirror-inputrules';

export default class BulletList extends Node {
  get name() {
    return 'bullet_list';
  }

  get schema() {
    return {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{tag: "ul"}],
      toDOM() { return ["ul", 0] }
    }
  }

  keys({ type }) {
    return {
      'Shift-Ctrl-8': wrapInList(type)
    }
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
