import Node from '../types/node';
import { wrappingInputRule } from "prosemirror-inputrules"

export default class OrderedList extends Node {
  get name() {
    return 'ordered_list';
  }

  inputRules({ type }) {
    return [
      // Given a list node type, returns an input rule that turns a number
      // followed by a dot at the start of a textblock into an ordered list.
      wrappingInputRule(
        /^(\d+)\.\s$/,
        type,
        match => ({order: +match[1]}),
        (match, node) => node.childCount + node.attrs.order == +match[1]
      )
    ]
  }
}
