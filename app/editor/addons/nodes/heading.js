import Node from '../types/node';
import { setBlockType } from 'prosemirror-commands';
import { textblockTypeInputRule } from 'prosemirror-inputrules';

export default class Heading extends Node {
  get name() {
    return 'heading';
  }

  get defaultOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
    }
  }

  get schema() {
    return {
      attrs: {level: {default: 1}},
      content: "inline*",
      group: "block",
      defining: true,
      parseDOM: [{tag: "h1", attrs: {level: 1}},
                 {tag: "h2", attrs: {level: 2}},
                 {tag: "h3", attrs: {level: 3}},
                 {tag: "h4", attrs: {level: 4}},
                 {tag: "h5", attrs: {level: 5}},
                 {tag: "h6", attrs: {level: 6}}],
      toDOM(node) { return ["h" + node.attrs.level, 0] }
    }
  }

  keys({ type }) {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      ...{
        [`Shift-Ctrl-${level}`]: setBlockType(type, { level }),
      },
    }), {})
  }

  inputRules({ type }) {
    return [
      // Given a node type and a maximum level, creates an input rule that
      // turns up to that number of `#` characters followed by a space at
      // the start of a textblock into a heading whose level corresponds to
      // the number of `#` signs.
      textblockTypeInputRule(
        new RegExp("^(#{1," + 6 + "})\\s$"),
        type,
        match => ({level: match[1].length})
      )
    ]
  }
}
