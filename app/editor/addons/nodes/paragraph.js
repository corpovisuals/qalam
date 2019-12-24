import Node from '../types/node';
import { setBlockType } from 'prosemirror-commands';
import { setStyle } from '../../commands';

export default class Paragraph extends Node {
  get name() {
    return 'paragraph';
  }

  get schema() {
    return {
      content: "inline*",
      group: "block",
      attrs: {
        style: { default: null }
      },
      parseDOM: [{tag: "p", getAttrs(dom) {
        return { style: dom.getAttribute("style") }
      }}],
      toDOM(node) { let { style } = node.attrs; return ["p", {style}, 0]; }
    }
  }

  commands({ type }) {
    return {
      setStyle: (attrs) => setStyle(type, attrs)
    }
  }

  keys({ type }) {
    return {
      'Shift-Ctrl-0': setBlockType(type)
    }
  }
}
