import { selectParentNode } from 'prosemirror-commands';
import { MenuItem } from './menu-item';

export const selectParentNodeItem = new MenuItem({
  title: "Select parent node",
  run: selectParentNode,
  select: state => selectParentNode(state),
  icon: {text: "\u2b1a", css: "font-weight: bold"}
})
