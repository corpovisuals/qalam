import Node from '../types/node';

export default class File extends Node {
  get name() {
    return 'file';
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        href: {},
        title: {}
      },
      group: "inline",
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(dom) {
            return {
              href: dom.getAttribute('href'),
              title: dom.getAttribute('title')
            }
          }
        }
      ],
      toDOM(node) {
        let { href, title } = node.attrs;
        return ['a', { href, title }, title]
      }
    }
  }
}
