import Node from '../types/node';
import {
  splitListItem,
  liftListItem,
  sinkListItem
} from '../../commands';

export default class ListItem extends Node {
  get name() {
    return 'list_item';
  }

  get schema() {
    return {
      content: 'paragraph block*',
      parseDOM: [{tag: "li"}],
      toDOM() { return ["li", 0] },
      defining: true
    }
  }

  keys({ type }) {
    return {
      'Enter': splitListItem(type),
      'Mod-[': liftListItem(type),
      'Mod-]': sinkListItem(type)
    }
  }
}
