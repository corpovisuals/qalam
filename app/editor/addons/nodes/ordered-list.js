import Node from '../types/node';
import { wrapInList } from '../../commands';
import { wrappingInputRule } from 'prosemirror-inputrules';

export default class OrderedList extends Node {
  get name() {
    return 'ordered_list';
  }

  get schema() {
    return {
      attrs: {order: {default: 1}},
      content: 'list_item+',
      group: 'block',
      parseDOM: [{tag: "ol", getAttrs(dom) {
        return {order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1}
      }}],
      toDOM(node) {
        return node.attrs.order == 1 ? ["ol", 0] : ["ol", {start: node.attrs.order}, 0]
      }
    }
  }

  commands({ type }) {
    return (attrs) => wrapInList(type, attrs);
  }

  keys({ type }) {
    return {
      'Shift-Ctrl-9': wrapInList(type)
    }
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
