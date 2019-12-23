import Node from '../types/node';
import { insertImage } from '../../commands'

export default class Image extends Node {
  get name() {
    return 'image';
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {},
        alt: {default: null},
        title: {default: null}
      },
      group: "inline",
      draggable: true,
      parseDOM: [{tag: "img[src]", getAttrs(dom) {
        return {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          alt: dom.getAttribute("alt")
        }
      }}],
      toDOM(node) { let {src, alt, title} = node.attrs; return ["img", {src, alt, title}] }
    }
  }

  commands({ type }) {
    return () => insertImage(type);
  }
}
