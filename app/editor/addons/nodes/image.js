import Node from '../types/node';

export default class Image extends Node {
  get name() {
    return 'image';
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {},
        srcset: { default: null },
        sizes: { default: null },
        alt: { default: null },
        title: { default: null },
        classNames: { default: null },
        style: { default: null },
        loading: { default: 'lazy' }
      },
      group: "inline",
      draggable: true,
      parseDOM: [{tag: "img[src]", getAttrs(dom) {
        return {
          src: dom.getAttribute("src"),
          srcset: dom.getAttribute("srcset"),
          sizes: dom.getAttribute("sizes"),
          alt: dom.getAttribute("alt"),
          title: dom.getAttribute("title"),
          classNames: dom.getAttribute("class"),
          style: dom.getAttribute("style"),
          loading: dom.getAttribute("loading")
        }
      }}],
      toDOM(node) {
        let { src, srcset, sizes, alt, title, classNames, style, loading } = node.attrs;
        return ["img", { src, srcset, sizes, alt, title, class: classNames, style, loading }];
      }
    }
  }
}
