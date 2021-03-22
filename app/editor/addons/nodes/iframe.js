import Node from '../types/node';

export default class Iframe extends Node {
  get name() {
    return 'iframe';
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {},
        title: { default: null },
        style: { default: null },
        loading: { default: 'lazy' },
        allow: { default: null },
        allowfullscreen: { default: 'false' }
      },
      group: "inline",
      draggable: true,
      parseDOM: [{tag: "iframe[src]", getAttrs(dom) {
        return {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          style: dom.getAttribute("style"),
          loading: dom.getAttribute("loading"),
          allow: dom.getAttribute("allow"),
          allowfullscreen: dom.getAttribute("allowfullscreen")
        }
      }}],
      toDOM(node) {
        let {
          src,
          title,
          style,
          loading,
          allow,
          allowfullscreen
        } = node.attrs;

        return [
          "iframe",
          {
            src,
            title,
            style,
            loading,
            allow,
            allowfullscreen
          }
        ];
      }
    }
  }
}
