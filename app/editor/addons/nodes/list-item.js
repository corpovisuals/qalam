import Node from '../types/node';
import {
  splitListItem,
  liftListItem,
  sinkListItem
} from 'prosemirror-schema-list';

export default class ListItem extends Node {
  get name() {
    return 'list_item';
  }

  keys({ type }) {
    return {
      'Enter': splitListItem(type),
      'Mod-[': liftListItem(type),
      'Mod-]': sinkListItem(type)
    }
  }
}
